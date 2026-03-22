QUnit.module('Color');

QUnit.test('creates color with hex value', assert => {
    const color = new Color('#FF0000');
    assert.equal(color.hex, '#FF0000', 'hex value is correct');
});

QUnit.test('creates color with lowercase hex', assert => {
    const color = new Color('#ff0000');
    assert.equal(color.hex, '#ff0000', 'hex value is preserved');
});

QUnit.test('equals returns true for same hex', assert => {
    const color1 = new Color('#FF0000');
    const color2 = new Color('#FF0000');
    assert.true(color1.equals(color2), 'colors are equal');
});

QUnit.test('equals returns false for different hex', assert => {
    const color1 = new Color('#FF0000');
    const color2 = new Color('#00FF00');
    assert.false(color1.equals(color2), 'colors are not equal');
});

QUnit.test('toString returns hex value', assert => {
    const color = new Color('#FF0000');
    assert.equal(color.toString(), '#FF0000', 'string representation is hex');
});

QUnit.test('I color is cyan', assert => {
    assert.equal(Color.I.hex, '#00FFFF', 'I color is cyan');
});

QUnit.test('O color is yellow', assert => {
    assert.equal(Color.O.hex, '#FFFF00', 'O color is yellow');
});

QUnit.test('T color is purple', assert => {
    assert.equal(Color.T.hex, '#800080', 'T color is purple');
});

QUnit.test('S color is green', assert => {
    assert.equal(Color.S.hex, '#00FF00', 'S color is green');
});

QUnit.test('Z color is red', assert => {
    assert.equal(Color.Z.hex, '#FF0000', 'Z color is red');
});

QUnit.test('J color is blue', assert => {
    assert.equal(Color.J.hex, '#0000FF', 'J color is blue');
});

QUnit.test('L color is orange', assert => {
    assert.equal(Color.L.hex, '#FFA500', 'L color is orange');
});
