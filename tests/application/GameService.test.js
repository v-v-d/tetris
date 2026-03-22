QUnit.module('GameService');

QUnit.test('creates game service', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    assert.equal(service.state.score, 0, 'initial score is 0');
    assert.equal(service.state.level, 1, 'initial level is 1');
});

QUnit.test('starts game', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    service.start();
    assert.true(service.state.currentPiece !== null, 'current piece is spawned');
    assert.true(service.state.nextPiece !== null, 'next piece is spawned');
});

QUnit.test('pauses game', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    service.start();
    service.pause();
    assert.true(service.state.isPaused, 'game is paused');
});

QUnit.test('restarts game', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    service.start();
    service.updateScore(100);
    service.restart();
    assert.equal(service.state.score, 0, 'score is reset');
    assert.false(service.state.isPaused, 'game is not paused');
});

QUnit.test('moves piece left', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    service.start();
    const originalX = service.state.currentPiece.position.x;
    service.moveLeft();
    assert.equal(service.state.currentPiece.position.x, originalX - 1, 'piece moved left');
});

QUnit.test('moves piece right', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    service.start();
    const originalX = service.state.currentPiece.position.x;
    service.moveRight();
    assert.equal(service.state.currentPiece.position.x, originalX + 1, 'piece moved right');
});

QUnit.test('moves piece down', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    service.start();
    const originalY = service.state.currentPiece.position.y;
    service.moveDown();
    assert.equal(service.state.currentPiece.position.y, originalY + 1, 'piece moved down');
});

QUnit.test('rotates piece', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    service.start();
    // Keep rotating until we get a non-O shape (O shape doesn't change when rotated)
    let attempts = 0;
    while (service.state.currentPiece.shape.type === 'O' && attempts < 10) {
        service.restart();
        service.start();
        attempts++;
    }
    
    const originalMatrix = service.state.currentPiece.shape.getMatrix();
    service.rotate();
    const rotatedMatrix = service.state.currentPiece.shape.getMatrix();
    assert.notDeepEqual(originalMatrix, rotatedMatrix, 'piece is rotated');
});

QUnit.test('hard drops piece', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    service.start();
    const originalPiece = service.state.currentPiece;
    service.hardDrop();
    // After hard drop, a new piece is spawned at the top
    assert.true(service.state.currentPiece !== originalPiece, 'new piece spawned after hard drop');
});

QUnit.test('updates game', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    service.start();
    const originalY = service.state.currentPiece.position.y;
    service.update();
    assert.equal(service.state.currentPiece.position.y, originalY + 1, 'piece moved down on update');
});

QUnit.test('gets drop interval', assert => {
    const board = new GameBoard(10, 20);
    const collisionService = new CollisionService();
    const rotationService = new RotationService();
    const lineClearService = new LineClearService();
    const scoreCalculator = new ScoreCalculator();
    
    const service = new GameService(
        board,
        collisionService,
        rotationService,
        lineClearService,
        scoreCalculator
    );
    
    const interval = service.getDropInterval();
    assert.true(interval > 0, 'drop interval is positive');
});
