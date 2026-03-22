QUnit.module('LineClearService');

QUnit.test('finds no lines in empty board', assert => {
    const service = new LineClearService();
    const board = new GameBoard(10, 20);
    const lines = service.findCompleteLines(board);
    assert.equal(lines.length, 0, 'no complete lines found');
});

QUnit.test('finds one complete line', assert => {
    const service = new LineClearService();
    const board = new GameBoard(10, 20);
    for (let x = 0; x < 10; x++) {
        board.setCell(x, 10, Color.I);
    }
    const lines = service.findCompleteLines(board);
    assert.equal(lines.length, 1, 'one complete line found');
    assert.equal(lines[0], 10, 'line 10 is complete');
});

QUnit.test('finds multiple complete lines', assert => {
    const service = new LineClearService();
    const board = new GameBoard(10, 20);
    for (let x = 0; x < 10; x++) {
        board.setCell(x, 10, Color.I);
        board.setCell(x, 11, Color.O);
    }
    const lines = service.findCompleteLines(board);
    assert.equal(lines.length, 2, 'two complete lines found');
});

QUnit.test('does not find incomplete lines', assert => {
    const service = new LineClearService();
    const board = new GameBoard(10, 20);
    for (let x = 0; x < 9; x++) {
        board.setCell(x, 10, Color.I);
    }
    const lines = service.findCompleteLines(board);
    assert.equal(lines.length, 0, 'incomplete line not found');
});

QUnit.test('clears one line', assert => {
    const service = new LineClearService();
    const board = new GameBoard(10, 20);
    for (let x = 0; x < 10; x++) {
        board.setCell(x, 10, Color.I);
    }
    const cleared = service.clearLines(board, [10]);
    assert.equal(cleared, 1, 'one line cleared');
    assert.equal(board.getCell(5, 10), null, 'line is cleared');
});

QUnit.test('clears multiple lines', assert => {
    const service = new LineClearService();
    const board = new GameBoard(10, 20);
    for (let x = 0; x < 10; x++) {
        board.setCell(x, 10, Color.I);
        board.setCell(x, 11, Color.O);
    }
    const cleared = service.clearLines(board, [10, 11]);
    assert.equal(cleared, 2, 'two lines cleared');
});

QUnit.test('shifts lines down after clearing', assert => {
    const service = new LineClearService();
    const board = new GameBoard(10, 20);
    for (let x = 0; x < 10; x++) {
        board.setCell(x, 10, Color.I);
        board.setCell(x, 9, Color.O);
    }
    service.clearLines(board, [10]);
    assert.equal(board.getCell(5, 10), Color.O, 'line shifted down');
});
