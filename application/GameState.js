/**
 * Class: GameState
 * Manages the state of the game
 */
class GameState {
    /**
     * @param {GameBoard} board - Game board
     * @param {Tetromino|null} currentPiece - Current falling piece
     * @param {Tetromino|null} nextPiece - Next piece to spawn
     * @param {number} score - Current score
     * @param {number} level - Current level
     * @param {number} lines - Total lines cleared
     * @param {boolean} isGameOver - Game over flag
     * @param {boolean} isPaused - Paused flag
     * @param {boolean} isStarted - Started flag
     */
    constructor(
        board,
        currentPiece = null,
        nextPiece = null,
        score = 0,
        level = 1,
        lines = 0,
        isGameOver = false,
        isPaused = false,
        isStarted = false
    ) {
        this._board = board;
        this._currentPiece = currentPiece;
        this._nextPiece = nextPiece;
        this._score = score;
        this._level = level;
        this._lines = lines;
        this._isGameOver = isGameOver;
        this._isPaused = isPaused;
        this._isStarted = isStarted;
    }

    get board() {
        return this._board;
    }

    get currentPiece() {
        return this._currentPiece;
    }

    get nextPiece() {
        return this._nextPiece;
    }

    get score() {
        return this._score;
    }

    get level() {
        return this._level;
    }

    get lines() {
        return this._lines;
    }

    get isGameOver() {
        return this._isGameOver;
    }

    get isPaused() {
        return this._isPaused;
    }

    get isStarted() {
        return this._isStarted;
    }

    /**
     * Creates a new game state with updated board
     * @param {GameBoard} board
     * @returns {GameState}
     */
    withBoard(board) {
        return new GameState(
            board,
            this._currentPiece,
            this._nextPiece,
            this._score,
            this._level,
            this._lines,
            this._isGameOver,
            this._isPaused,
            this._isStarted
        );
    }

    /**
     * Creates a new game state with updated current piece
     * @param {Tetromino|null} currentPiece
     * @returns {GameState}
     */
    withCurrentPiece(currentPiece) {
        return new GameState(
            this._board,
            currentPiece,
            this._nextPiece,
            this._score,
            this._level,
            this._lines,
            this._isGameOver,
            this._isPaused,
            this._isStarted
        );
    }

    /**
     * Creates a new game state with updated next piece
     * @param {Tetromino|null} nextPiece
     * @returns {GameState}
     */
    withNextPiece(nextPiece) {
        return new GameState(
            this._board,
            this._currentPiece,
            nextPiece,
            this._score,
            this._level,
            this._lines,
            this._isGameOver,
            this._isPaused,
            this._isStarted
        );
    }

    /**
     * Creates a new game state with updated score
     * @param {number} score
     * @returns {GameState}
     */
    withScore(score) {
        return new GameState(
            this._board,
            this._currentPiece,
            this._nextPiece,
            score,
            this._level,
            this._lines,
            this._isGameOver,
            this._isPaused,
            this._isStarted
        );
    }

    /**
     * Creates a new game state with updated score
     * @param {number} points - Points to add
     * @returns {GameState}
     */
    withScoreAdded(points) {
        return this.withScore(this._score + points);
    }

    /**
     * Creates a new game state with updated level
     * @param {number} level
     * @returns {GameState}
     */
    withLevel(level) {
        return new GameState(
            this._board,
            this._currentPiece,
            this._nextPiece,
            this._score,
            level,
            this._lines,
            this._isGameOver,
            this._isPaused,
            this._isStarted
        );
    }

    /**
     * Creates a new game state with updated lines
     * @param {number} lines
     * @returns {GameState}
     */
    withLines(lines) {
        return new GameState(
            this._board,
            this._currentPiece,
            this._nextPiece,
            this._score,
            this._level,
            lines,
            this._isGameOver,
            this._isPaused,
            this._isStarted
        );
    }

    /**
     * Creates a new game state with updated game over flag
     * @param {boolean} isGameOver
     * @returns {GameState}
     */
    withGameOver(isGameOver) {
        return new GameState(
            this._board,
            this._currentPiece,
            this._nextPiece,
            this._score,
            this._level,
            this._lines,
            isGameOver,
            this._isPaused,
            this._isStarted
        );
    }

    /**
     * Creates a new game state with updated paused flag
     * @param {boolean} isPaused
     * @returns {GameState}
     */
    withPaused(isPaused) {
        return new GameState(
            this._board,
            this._currentPiece,
            this._nextPiece,
            this._score,
            this._level,
            this._lines,
            this._isGameOver,
            isPaused,
            this._isStarted
        );
    }

    /**
     * Creates a new game state with updated started flag
     * @param {boolean} isStarted
     * @returns {GameState}
     */
    withStarted(isStarted) {
        return new GameState(
            this._board,
            this._currentPiece,
            this._nextPiece,
            this._score,
            this._level,
            this._lines,
            this._isGameOver,
            this._isPaused,
            isStarted
        );
    }

    /**
     * Creates a new game state with multiple updates
     * @param {Object} updates - Object with properties to update
     * @returns {GameState}
     */
    withUpdates(updates) {
        return new GameState(
            updates.board !== undefined ? updates.board : this._board,
            updates.currentPiece !== undefined ? updates.currentPiece : this._currentPiece,
            updates.nextPiece !== undefined ? updates.nextPiece : this._nextPiece,
            updates.score !== undefined ? updates.score : this._score,
            updates.level !== undefined ? updates.level : this._level,
            updates.lines !== undefined ? updates.lines : this._lines,
            updates.isGameOver !== undefined ? updates.isGameOver : this._isGameOver,
            updates.isPaused !== undefined ? updates.isPaused : this._isPaused,
            updates.isStarted !== undefined ? updates.isStarted : this._isStarted
        );
    }

    /**
     * Creates an initial game state
     * @param {GameBoard} board
     * @returns {GameState}
     */
    static createInitial(board) {
        return new GameState(board);
    }

    /**
     * Creates a copy of this game state
     * @returns {GameState}
     */
    clone() {
        return new GameState(
            this._board.clone(),
            this._currentPiece ? this._currentPiece.clone() : null,
            this._nextPiece ? this._nextPiece.clone() : null,
            this._score,
            this._level,
            this._lines,
            this._isGameOver,
            this._isPaused,
            this._isStarted
        );
    }

    /**
     * Sets game over flag
     */
    setGameOver() {
        this._isGameOver = true;
    }

    /**
     * Toggles pause state
     */
    togglePause() {
        this._isPaused = !this._isPaused;
    }

    /**
     * Updates the score by adding points (mutable version)
     * @param {number} points - Points to add
     */
    updateScore(points) {
        this._score += points;
    }

    /**
     * Updates the level (mutable version)
     * @param {number} level - New level
     */
    updateLevel(level) {
        this._level = level;
    }

    /**
     * Updates the lines (mutable version)
     * @param {number} lines - New lines count
     */
    updateLines(lines) {
        this._lines = lines;
    }

    /**
     * Resets the state to initial values
     */
    reset() {
        this._score = 0;
        this._level = 1;
        this._lines = 0;
        this._isGameOver = false;
        this._isPaused = false;
        this._isStarted = false;
        this._currentPiece = null;
        this._nextPiece = null;
        this._board.clear();
    }
}
