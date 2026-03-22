QUnit.module('GameState');

QUnit.test('creates initial game state', assert => {
    const board = new GameBoard(10, 20);
    const state = new GameState(board);
    assert.equal(state.score, 0, 'initial score is 0');
    assert.equal(state.level, 1, 'initial level is 1');
    assert.equal(state.lines, 0, 'initial lines is 0');
    assert.false(state.isGameOver, 'game is not over');
    assert.false(state.isPaused, 'game is not paused');
});

QUnit.test('creates state with custom values', assert => {
    const board = new GameBoard(10, 20);
    const state = new GameState(board, null, null, 100, 2, 10);
    assert.equal(state.score, 100, 'score is 100');
    assert.equal(state.level, 2, 'level is 2');
    assert.equal(state.lines, 10, 'lines is 10');
});

QUnit.test('sets game over', assert => {
    const board = new GameBoard(10, 20);
    const state = new GameState(board);
    state.setGameOver();
    assert.true(state.isGameOver, 'game is over');
});

QUnit.test('toggles pause', assert => {
    const board = new GameBoard(10, 20);
    const state = new GameState(board);
    state.togglePause();
    assert.true(state.isPaused, 'game is paused');
    state.togglePause();
    assert.false(state.isPaused, 'game is not paused');
});

QUnit.test('updates score', assert => {
    const board = new GameBoard(10, 20);
    const state = new GameState(board);
    state.updateScore(100);
    assert.equal(state.score, 100, 'score is updated');
});

QUnit.test('updates level', assert => {
    const board = new GameBoard(10, 20);
    const state = new GameState(board);
    state.updateLevel(2);
    assert.equal(state.level, 2, 'level is updated');
});

QUnit.test('updates lines', assert => {
    const board = new GameBoard(10, 20);
    const state = new GameState(board);
    state.updateLines(5);
    assert.equal(state.lines, 5, 'lines is updated');
});

QUnit.test('resets state', assert => {
    const board = new GameBoard(10, 20);
    const state = new GameState(board);
    state.updateScore(100);
    state.updateLevel(2);
    state.updateLines(10);
    state.setGameOver();
    state.reset();
    assert.equal(state.score, 0, 'score is reset');
    assert.equal(state.level, 1, 'level is reset');
    assert.equal(state.lines, 0, 'lines is reset');
    assert.false(state.isGameOver, 'game is not over');
});
