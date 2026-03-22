/**
 * Service: GameService
 * Main game logic orchestrator
 * Coordinates domain services and manages game flow
 */
class GameService {
    /**
     * @param {GameBoard} board - Game board
     * @param {CollisionService} collisionService - Collision detection service
     * @param {RotationService} rotationService - Rotation service
     * @param {LineClearService} lineClearService - Line clearing service
     * @param {ScoreCalculator} scoreCalculator - Score calculator
     */
    constructor(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    ) {
        this._board = board;
        this._collisionService = collisionService;
        this._rotationService = rotationService;
        this._lineClearService = lineClearService;
        this._scoreCalculator = scoreCalculator;
        this._state = GameState.createInitial(board);
    }

    get state() {
        return this._state;
    }

    /**
     * Starts a new game
     * @returns {GameState}
     */
    start() {
        this._board.clear();
        const nextPiece = this._createNextPiece();
        const currentPiece = this._spawnPiece(nextPiece);
        
        this._state = this._state.withUpdates({
            currentPiece: currentPiece,
            nextPiece: nextPiece,
            score: 0,
            level: 1,
            lines: 0,
            isGameOver: false,
            isPaused: false,
            isStarted: true
        });
        
        return this._state;
    }

    /**
     * Pauses the game
     * @returns {GameState}
     */
    pause() {
        if (!this._state.isStarted || this._state.isGameOver) {
            return this._state;
        }
        
        this._state = this._state.withPaused(!this._state.isPaused);
        return this._state;
    }

    /**
     * Restarts the game
     * @returns {GameState}
     */
    restart() {
        return this.start();
    }

    /**
     * Moves the current piece left
     * @returns {GameState|null} New state or null if move not possible
     */
    moveLeft() {
        if (!this._canAct()) {
            return null;
        }
        
        const currentPiece = this._state.currentPiece;
        if (this._collisionService.canMoveLeft(currentPiece, this._board)) {
            this._state = this._state.withCurrentPiece(currentPiece.move(-1, 0));
            return this._state;
        }
        
        return null;
    }

    /**
     * Moves the current piece right
     * @returns {GameState|null} New state or null if move not possible
     */
    moveRight() {
        if (!this._canAct()) {
            return null;
        }
        
        const currentPiece = this._state.currentPiece;
        if (this._collisionService.canMoveRight(currentPiece, this._board)) {
            this._state = this._state.withCurrentPiece(currentPiece.move(1, 0));
            return this._state;
        }
        
        return null;
    }

    /**
     * Moves the current piece down
     * @returns {GameState|null} New state or null if move not possible
     */
    moveDown() {
        if (!this._canAct()) {
            return null;
        }
        
        const currentPiece = this._state.currentPiece;
        if (this._collisionService.canMoveDown(currentPiece, this._board)) {
            this._state = this._state.withCurrentPiece(currentPiece.move(0, 1));
            return this._state;
        }
        
        return null;
    }

    /**
     * Rotates the current piece
     * @returns {GameState|null} New state or null if rotation not possible
     */
    rotate() {
        if (!this._canAct()) {
            return null;
        }
        
        const currentPiece = this._state.currentPiece;
        const rotated = this._rotationService.rotateWithWallKick(currentPiece, this._board);
        
        if (rotated) {
            this._state = this._state.withCurrentPiece(rotated);
            return this._state;
        }
        
        return null;
    }

    /**
     * Hard drops the current piece
     * @returns {GameState}
     */
    hardDrop() {
        if (!this._canAct()) {
            return this._state;
        }
        
        const currentPiece = this._state.currentPiece;
        const dropped = this._collisionService.hardDrop(currentPiece, this._board);
        
        this._state = this._state.withCurrentPiece(dropped);
        this._lockPiece();
        
        return this._state;
    }

    /**
     * Updates the game (called on each tick)
     * @returns {GameState}
     */
    update() {
        if (!this._canAct()) {
            return this._state;
        }
        
        const currentPiece = this._state.currentPiece;
        
        if (this._collisionService.canMoveDown(currentPiece, this._board)) {
            this._state = this._state.withCurrentPiece(currentPiece.move(0, 1));
        } else {
            this._lockPiece();
        }
        
        return this._state;
    }

    /**
     * Locks the current piece in place and spawns a new one
     * @private
     */
    _lockPiece() {
        const currentPiece = this._state.currentPiece;
        this._board.place(currentPiece);
        
        // Clear lines
        const linesCleared = this._lineClearService.clearLines(this._board);
        
        if (linesCleared > 0) {
            this._updateScore(linesCleared);
        }
        
        // Spawn new piece
        this._spawnNextPiece();
    }

    /**
     * Updates score based on lines cleared
     * @private
     * @param {number} linesCleared
     */
    _updateScore(linesCleared) {
        const currentScore = this._state.score;
        const currentLines = this._state.lines;
        const currentLevel = this._state.level;
        
        const newScore = currentScore + this._scoreCalculator.calculateScore(linesCleared, currentLevel);
        const newLines = currentLines + linesCleared;
        const newLevel = this._scoreCalculator.calculateLevel(newLines);
        
        this._state = this._state.withUpdates({
            score: newScore,
            lines: newLines,
            level: newLevel
        });
    }

    /**
     * Spawns the next piece
     * @private
     */
    _spawnNextPiece() {
        const nextPiece = this._state.nextPiece;
        const currentPiece = this._spawnPiece(nextPiece);
        
        if (currentPiece === null) {
            // Game over
            this._state = this._state.withGameOver(true);
            return;
        }
        
        const newNextPiece = this._createNextPiece();
        
        this._state = this._state.withUpdates({
            currentPiece: currentPiece,
            nextPiece: newNextPiece
        });
    }

    /**
     * Spawns a piece at the top of the board
     * @private
     * @param {Tetromino} piece - Piece to spawn
     * @returns {Tetromino|null} Spawned piece or null if game over
     */
    _spawnPiece(piece) {
        const startX = Math.floor((this._board.width - piece.shape.getWidth()) / 2);
        const startY = 0;
        const position = new Position(startX, startY);
        const spawnedPiece = piece.moveTo(position);
        
        if (this._board.canPlace(spawnedPiece)) {
            return spawnedPiece;
        }
        
        return null;
    }

    /**
     * Creates a random next piece
     * @private
     * @returns {Tetromino}
     */
    _createNextPiece() {
        const position = new Position(0, 0);
        return Tetromino.createRandom(position);
    }

    /**
     * Checks if the game can accept actions
     * @private
     * @returns {boolean}
     */
    _canAct() {
        return this._state.isStarted && 
               !this._state.isPaused && 
               !this._state.isGameOver &&
               this._state.currentPiece !== null;
    }

    /**
     * Gets the drop interval for the current level
     * @returns {number} Drop interval in milliseconds
     */
    getDropInterval() {
        return this._scoreCalculator.calculateDropInterval(this._state.level);
    }

    /**
     * Updates the score (for testing purposes)
     * @param {number} points - Points to add
     * @returns {GameState}
     */
    updateScore(points) {
        this._state = this._state.withScoreAdded(points);
        return this._state;
    }
}
