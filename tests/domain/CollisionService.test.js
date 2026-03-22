QUnit.module('CollisionService');

QUnit.test('detects collision with left wall', assert => {
    const service = new CollisionService();
    const board = new GameBoard(10, 20);
    const position = new Position(-1, 10);
    const tetromino = new Tetromino(Shape.O, Color.O, position);
    assert.true(service.checkCollision(tetromino, board), 'collision with left wall detected');
});

QUnit.test('detects collision with right wall', assert => {
    const service = new CollisionService();
    const board = new GameBoard(10, 20);
    const position = new Position(9, 10);
    const tetromino = new Tetromino(Shape.O, Color.O, position);
    assert.true(service.checkCollision(tetromino, board), 'collision with right wall detected');
});

QUnit.test('detects collision with bottom wall', assert => {
    const service = new CollisionService();
    const board = new GameBoard(10, 20);
    const position = new Position(5, 19);
    const tetromino = new Tetromino(Shape.O, Color.O, position);
    assert.true(service.checkCollision(tetromino, board), 'collision with bottom wall detected');
});

QUnit.test('detects collision with placed pieces', assert => {
    const service = new CollisionService();
    const board = new GameBoard(10, 20);
    board.setCell(5, 10, Color.I);
    const position = new Position(5, 9);
    const tetromino = new Tetromino(Shape.O, Color.O, position);
    assert.true(service.checkCollision(tetromino, board), 'collision with placed piece detected');
});

QUnit.test('no collision in empty space', assert => {
    const service = new CollisionService();
    const board = new GameBoard(10, 20);
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.O, Color.O, position);
    assert.false(service.checkCollision(tetromino, board), 'no collision in empty space');
});

QUnit.test('no collision at valid position', assert => {
    const service = new CollisionService();
    const board = new GameBoard(10, 20);
    const position = new Position(0, 0);
    const tetromino = new Tetromino(Shape.O, Color.O, position);
    assert.false(service.checkCollision(tetromino, board), 'no collision at valid position');
});
