/**
 * Controller: GameController
 * Main game controller that orchestrates the game
 * NOT TESTED - Presentation layer
 */
class GameController {
    /**
     * @param {GameService} gameService - Game service
     * @param {CanvasRenderer} boardRenderer - Board renderer
     * @param {CanvasRenderer} nextPieceRenderer - Next piece renderer
     * @param {KeyboardInputHandler} inputHandler - Input handler
     */
    constructor(gameService, boardRenderer, nextPieceRenderer, inputHandler) {
        this._gameService = gameService;
        this._boardRenderer = boardRenderer;
        this._nextPieceRenderer = nextPieceRenderer;
        this._inputHandler = inputHandler;
        this._gameLoop = null;
        this._lastTime = 0;
    }

    /**
     * Initializes the game
     */
    init() {
        this._inputHandler.setup();
        this._render();
    }

    /**
     * Starts the game
     */
    start() {
        this._gameService.start();
        this._startGameLoop();
        this._render();
    }

    /**
     * Pauses the game
     */
    pause() {
        this._gameService.pause();
        this._render();
    }

    /**
     * Restarts the game
     */
    restart() {
        this._gameService.restart();
        this._startGameLoop();
        this._render();
    }

    /**
     * Moves the current piece left
     */
    moveLeft() {
        this._gameService.moveLeft();
        this._render();
    }

    /**
     * Moves the current piece right
     */
    moveRight() {
        this._gameService.moveRight();
        this._render();
    }

    /**
     * Moves the current piece down
     */
    moveDown() {
        this._gameService.moveDown();
        this._render();
    }

    /**
     * Rotates the current piece
     */
    rotate() {
        this._gameService.rotate();
        this._render();
    }

    /**
     * Hard drops the current piece
     */
    hardDrop() {
        this._gameService.hardDrop();
        this._render();
    }

    /**
     * Starts the game loop
     * @private
     */
    _startGameLoop() {
        if (this._gameLoop) {
            cancelAnimationFrame(this._gameLoop);
        }
        
        this._lastTime = performance.now();
        this._gameLoop = requestAnimationFrame(this._gameLoopTick.bind(this));
    }

    /**
     * Stops the game loop
     * @private
     */
    _stopGameLoop() {
        if (this._gameLoop) {
            cancelAnimationFrame(this._gameLoop);
            this._gameLoop = null;
        }
    }

    /**
     * Game loop tick
     * @private
     * @param {number} currentTime
     */
    _gameLoopTick(currentTime) {
        const deltaTime = currentTime - this._lastTime;
        const dropInterval = this._gameService.getDropInterval();
        
        if (deltaTime >= dropInterval) {
            this._gameService.update();
            this._render();
            this._lastTime = currentTime;
        }
        
        if (!this._gameService.state.isGameOver) {
            this._gameLoop = requestAnimationFrame(this._gameLoopTick.bind(this));
        } else {
            this._stopGameLoop();
        }
    }

    /**
     * Renders the game
     * @private
     */
    _render() {
        const state = this._gameService.state;
        
        // Render board
        this._boardRenderer.renderBoard(state.board);
        
        // Render current piece
        if (state.currentPiece) {
            this._boardRenderer.renderTetromino(state.currentPiece);
        }
        
        // Render next piece
        this._nextPieceRenderer.renderNextPiece(state.nextPiece);
        
        // Update UI
        this._updateUI(state);
    }

    /**
     * Updates the UI elements
     * @private
     * @param {GameState} state
     */
    _updateUI(state) {
        const scoreElement = document.getElementById('score');
        const levelElement = document.getElementById('level');
        const linesElement = document.getElementById('lines');
        const gameOverElement = document.getElementById('game-over');
        const pausedElement = document.getElementById('paused');
        
        if (scoreElement) {
            scoreElement.textContent = state.score;
        }
        
        if (levelElement) {
            levelElement.textContent = state.level;
        }
        
        if (linesElement) {
            linesElement.textContent = state.lines;
        }
        
        if (gameOverElement) {
            gameOverElement.style.display = state.isGameOver ? 'block' : 'none';
        }
        
        if (pausedElement) {
            pausedElement.style.display = state.isPaused ? 'block' : 'none';
        }
    }

    /**
     * Cleans up resources
     */
    destroy() {
        this._stopGameLoop();
        this._inputHandler.teardown();
    }
}
