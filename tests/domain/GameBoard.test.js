QUnit.module('GameBoard');

QUnit.test('creates board with correct dimensions', assert => {
    const board = new GameBoard(10, 20);
    assert.equal(board.width, 10, 'width is correct');
    assert.equal(board.height, 20, 'height is correct');
});

QUnit.test('initial board is empty', assert => {
    const board = new GameBoard(10, 20);
    for (let y = 0; y < board.height; y++) {
        for (let x = 0; x < board.width; x++) {
            assert.equal(board.getCell(x, y), null, `cell (${x}, ${y}) is empty`);
        }
    }
});

QUnit.test('sets and gets cell', assert => {
    const board = new GameBoard(10, 20);
    const color = Color.I;
    board.setCell(5, 10, color);
    assert.equal(board.getCell(5, 10), color, 'cell is set correctly');
});

QUnit.test('clears cell', assert => {
    const board = new GameBoard(10, 20);
    board.setCell(5, 10, Color.I);
    board.clearCell(5, 10);
    assert.equal(board.getCell(5, 10), null, 'cell is cleared');
});

QUnit.test('checks if cell is empty', assert => {
    const board = new GameBoard(10, 20);
    assert.true(board.isEmpty(5, 10), 'cell is initially empty');
    board.setCell(5, 10, Color.I);
    assert.false(board.isEmpty(5, 10), 'cell is not empty after setting');
});

QUnit.test('checks if position is valid', assert => {
    const board = new GameBoard(10, 20);
    assert.true(board.isValidPosition(0, 0), 'origin is valid');
    assert.true(board.isValidPosition(9, 19), 'bottom-right is valid');
    assert.false(board.isValidPosition(-1, 0), 'negative x is invalid');
    assert.false(board.isValidPosition(0, -1), 'negative y is invalid');
    assert.false(board.isValidPosition(10, 0), 'x out of bounds is invalid');
    assert.false(board.isValidPosition(0, 20), 'y out of bounds is invalid');
});

QUnit.test('clears entire board', assert => {
    const board = new GameBoard(10, 20);
    board.setCell(5, 10, Color.I);
    board.setCell(3, 5, Color.O);
    board.clear();
    assert.equal(board.getCell(5, 10), null, 'cell is cleared');
    assert.equal(board.getCell(3, 5), null, 'cell is cleared');
});

QUnit.test('gets grid copy', assert => {
    const board = new GameBoard(10, 20);
    board.setCell(5, 10, Color.I);
    const grid = board.getGrid();
    assert.equal(grid[10][5], Color.I, 'grid copy has correct value');
});

QUnit.test('grid copy is independent', assert => {
    const board = new GameBoard(10, 20);
    const grid = board.getGrid();
    grid[10][5] = Color.O;
    assert.equal(board.getCell(5, 10), null, 'original board is unchanged');
});
