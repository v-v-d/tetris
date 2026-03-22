/**
 * Main entry point for the Tetris game
 * Initializes all components and starts the game
 */

/**
 * Initializes the game
 */
function initGame() {
    // Create domain services
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    // Create application service
    const gameService = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    // Create infrastructure components
    const boardCanvas = document.getElementById('game-board');
    const nextPieceCanvas = document.getElementById('next-piece');
    const boardRenderer = new CanvasRenderer(boardCanvas, 30);
    const nextPieceRenderer = new CanvasRenderer(nextPieceCanvas, 25);
    
    // Create input handler
    const inputHandler = new KeyboardInputHandler(
        () => gameController.moveLeft(),
        () => gameController.moveRight(),
        () => gameController.moveDown(),
        () => gameController.rotate(),
        () => gameController.hardDrop(),
        () => gameController.pause()
    );
    
    // Create game controller (without touch handler initially)
    const gameController = new GameController(
        gameService,
        boardRenderer,
        nextPieceRenderer,
        inputHandler
    );
    
    // Create touch input handler (requires gameController to be created first)
    const touchInputHandler = new TouchInputHandler(gameController);
    
    // Update game controller with touch input handler
    gameController._touchInputHandler = touchInputHandler;
    
    // Setup button handlers
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const restartButton = document.getElementById('restart-button');
    
    if (startButton) {
        startButton.addEventListener('click', () => {
            gameController.start();
        });
    }
    
    if (pauseButton) {
        pauseButton.addEventListener('click', () => {
            gameController.pause();
        });
    }
    
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            gameController.restart();
        });
    }
    
    // Initialize the game
    gameController.init();
    
    // Expose game controller globally for debugging
    window.gameController = gameController;
    
    console.log('Tetris game initialized!');
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
