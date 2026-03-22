QUnit.module('Position');

QUnit.test('creates position with x and y coordinates', assert => {
    const position = new Position(5, 10);
    assert.equal(position.x, 5, 'x coordinate is correct');
    assert.equal(position.y, 10, 'y coordinate is correct');
});

QUnit.test('creates position at origin', assert => {
    const position = new Position(0, 0);
    assert.equal(position.x, 0, 'x coordinate is 0');
    assert.equal(position.y, 0, 'y coordinate is 0');
});

QUnit.test('creates position with negative coordinates', assert => {
    const position = new Position(-3, -5);
    assert.equal(position.x, -3, 'x coordinate is negative');
    assert.equal(position.y, -5, 'y coordinate is negative');
});

QUnit.test('moves position by dx and dy', assert => {
    const position = new Position(5, 10);
    const moved = position.move(2, 3);
    assert.equal(moved.x, 7, 'x coordinate is updated');
    assert.equal(moved.y, 13, 'y coordinate is updated');
});

QUnit.test('move returns new position instance', assert => {
    const position = new Position(5, 10);
    const moved = position.move(1, 1);
    assert.notStrictEqual(position, moved, 'move returns new instance');
});

QUnit.test('moves position with negative deltas', assert => {
    const position = new Position(5, 10);
    const moved = position.move(-2, -3);
    assert.equal(moved.x, 3, 'x coordinate is decreased');
    assert.equal(moved.y, 7, 'y coordinate is decreased');
});

QUnit.test('equals returns true for same coordinates', assert => {
    const position1 = new Position(5, 10);
    const position2 = new Position(5, 10);
    assert.true(position1.equals(position2), 'positions are equal');
});

QUnit.test('equals returns false for different coordinates', assert => {
    const position1 = new Position(5, 10);
    const position2 = new Position(6, 10);
    assert.false(position1.equals(position2), 'positions are not equal');
});

QUnit.test('toString returns correct format', assert => {
    const position = new Position(5, 10);
    assert.equal(position.toString(), 'Position(5, 10)', 'string representation is correct');
});
