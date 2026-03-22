QUnit.module('Tetromino');

QUnit.test('creates tetromino with shape and position', assert => {
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.I, Color.I, position);
    assert.equal(tetromino.shape, Shape.I, 'shape is correct');
    assert.equal(tetromino.color, Color.I, 'color is correct');
    assert.equal(tetromino.position.x, 5, 'position x is correct');
    assert.equal(tetromino.position.y, 10, 'position y is correct');
});

QUnit.test('moves tetromino left', assert => {
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.I, Color.I, position);
    const moved = tetromino.moveLeft();
    assert.equal(moved.position.x, 4, 'x decreased by 1');
    assert.equal(moved.position.y, 10, 'y unchanged');
});

QUnit.test('moves tetromino right', assert => {
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.I, Color.I, position);
    const moved = tetromino.moveRight();
    assert.equal(moved.position.x, 6, 'x increased by 1');
    assert.equal(moved.position.y, 10, 'y unchanged');
});

QUnit.test('moves tetromino down', assert => {
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.I, Color.I, position);
    const moved = tetromino.moveDown();
    assert.equal(moved.position.x, 5, 'x unchanged');
    assert.equal(moved.position.y, 11, 'y increased by 1');
});

QUnit.test('rotates tetromino', assert => {
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.I, Color.I, position);
    const rotated = tetromino.rotate();
    assert.notDeepEqual(tetromino.shape.getMatrix(), rotated.shape.getMatrix(), 'shape matrix changed');
});

QUnit.test('move returns new tetromino instance', assert => {
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.I, Color.I, position);
    const moved = tetromino.moveLeft();
    assert.notStrictEqual(tetromino, moved, 'move returns new instance');
});

QUnit.test('getCells returns correct cells', assert => {
    const position = new Position(0, 0);
    const tetromino = new Tetromino(Shape.O, Color.O, position);
    const cells = tetromino.getCells();
    assert.equal(cells.length, 4, 'O shape has 4 cells');
});

QUnit.test('creates random tetromino', assert => {
    const position = new Position(5, 0);
    const tetromino = Tetromino.createRandom(position);
    const allTypes = Shape.TYPES;
    assert.true(allTypes.includes(tetromino.shape.type), 'random tetromino has valid shape type');
});

QUnit.test('random tetromino has correct color', assert => {
    const position = new Position(5, 0);
    const tetromino = Tetromino.createRandom(position);
    const allColors = Object.values(Color.COLORS);
    assert.true(allColors.some(c => c.equals(tetromino.color)), 'random tetromino has valid color');
});
