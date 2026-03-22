QUnit.module('RotationService');

QUnit.test('rotates tetromino', assert => {
    const service = new RotationService();
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.I, Color.I, position);
    const rotated = service.rotate(tetromino);
    assert.notDeepEqual(tetromino.shape.getMatrix(), rotated.shape.getMatrix(), 'shape is rotated');
});

QUnit.test('rotation returns new tetromino', assert => {
    const service = new RotationService();
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.I, Color.I, position);
    const rotated = service.rotate(tetromino);
    assert.notStrictEqual(tetromino, rotated, 'rotation returns new instance');
});

QUnit.test('rotation preserves position', assert => {
    const service = new RotationService();
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.I, Color.I, position);
    const rotated = service.rotate(tetromino);
    assert.equal(rotated.position.x, 5, 'x position is preserved');
    assert.equal(rotated.position.y, 10, 'y position is preserved');
});

QUnit.test('rotation preserves color', assert => {
    const service = new RotationService();
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.I, Color.I, position);
    const rotated = service.rotate(tetromino);
    assert.equal(rotated.color, Color.I, 'color is preserved');
});

QUnit.test('rotates O shape (should be same)', assert => {
    const service = new RotationService();
    const position = new Position(5, 10);
    const tetromino = new Tetromino(Shape.O, Color.O, position);
    const rotated = service.rotate(tetromino);
    assert.deepEqual(tetromino.shape.getMatrix(), rotated.shape.getMatrix(), 'O shape rotation is same');
});
