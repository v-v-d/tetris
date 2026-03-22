QUnit.module('Shape');

QUnit.test('creates I shape', assert => {
    const shape = Shape.I;
    const matrix = shape.getMatrix();
    assert.equal(matrix.length, 4, 'I shape has 4 rows');
    assert.equal(matrix[0].length, 4, 'I shape has 4 columns');
});

QUnit.test('creates O shape', assert => {
    const shape = Shape.O;
    const matrix = shape.getMatrix();
    assert.equal(matrix.length, 2, 'O shape has 2 rows');
    assert.equal(matrix[0].length, 2, 'O shape has 2 columns');
});

QUnit.test('creates T shape', assert => {
    const shape = Shape.T;
    const matrix = shape.getMatrix();
    assert.equal(matrix.length, 3, 'T shape has 3 rows');
    assert.equal(matrix[0].length, 3, 'T shape has 3 columns');
});

QUnit.test('creates S shape', assert => {
    const shape = Shape.S;
    const matrix = shape.getMatrix();
    assert.equal(matrix.length, 3, 'S shape has 3 rows');
    assert.equal(matrix[0].length, 3, 'S shape has 3 columns');
});

QUnit.test('creates Z shape', assert => {
    const shape = Shape.Z;
    const matrix = shape.getMatrix();
    assert.equal(matrix.length, 3, 'Z shape has 3 rows');
    assert.equal(matrix[0].length, 3, 'Z shape has 3 columns');
});

QUnit.test('creates J shape', assert => {
    const shape = Shape.J;
    const matrix = shape.getMatrix();
    assert.equal(matrix.length, 3, 'J shape has 3 rows');
    assert.equal(matrix[0].length, 3, 'J shape has 3 columns');
});

QUnit.test('creates L shape', assert => {
    const shape = Shape.L;
    const matrix = shape.getMatrix();
    assert.equal(matrix.length, 3, 'L shape has 3 rows');
    assert.equal(matrix[0].length, 3, 'L shape has 3 columns');
});

QUnit.test('rotates I shape', assert => {
    const shape = Shape.I;
    const rotated = shape.rotate();
    const originalMatrix = shape.getMatrix();
    const rotatedMatrix = rotated.getMatrix();
    
    assert.notDeepEqual(originalMatrix, rotatedMatrix, 'rotated matrix is different');
});

QUnit.test('rotates O shape (should be same)', assert => {
    const shape = Shape.O;
    const rotated = shape.rotate();
    const originalMatrix = shape.getMatrix();
    const rotatedMatrix = rotated.getMatrix();
    
    assert.deepEqual(originalMatrix, rotatedMatrix, 'O shape rotation is same');
});

QUnit.test('getWidth returns correct width', assert => {
    const shape = Shape.I;
    assert.equal(shape.getWidth(), 4, 'I shape width is 4');
});

QUnit.test('getHeight returns correct height', assert => {
    const shape = Shape.I;
    assert.equal(shape.getHeight(), 4, 'I shape height is 4');
});

QUnit.test('getAllShapes returns all 7 shapes', assert => {
    const shapes = Shape.getAllShapes();
    assert.equal(shapes.length, 7, 'there are 7 shapes');
});

QUnit.test('createRandom returns a valid shape', assert => {
    const shape = Shape.createRandom();
    const allShapes = Shape.getAllShapes();
    assert.true(allShapes.includes(shape), 'random shape is valid');
});
