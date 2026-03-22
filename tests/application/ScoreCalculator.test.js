QUnit.module('ScoreCalculator');

QUnit.test('calculates score for 1 line', assert => {
    const calculator = new ScoreCalculator();
    const score = calculator.calculate(1, 1);
    assert.equal(score, 100, 'score for 1 line is 100');
});

QUnit.test('calculates score for 2 lines', assert => {
    const calculator = new ScoreCalculator();
    const score = calculator.calculate(2, 1);
    assert.equal(score, 300, 'score for 2 lines is 300');
});

QUnit.test('calculates score for 3 lines', assert => {
    const calculator = new ScoreCalculator();
    const score = calculator.calculate(3, 1);
    assert.equal(score, 500, 'score for 3 lines is 500');
});

QUnit.test('calculates score for 4 lines (Tetris)', assert => {
    const calculator = new ScoreCalculator();
    const score = calculator.calculate(4, 1);
    assert.equal(score, 800, 'score for 4 lines is 800');
});

QUnit.test('multiplies score by level', assert => {
    const calculator = new ScoreCalculator();
    const score = calculator.calculate(1, 2);
    assert.equal(score, 200, 'score is multiplied by level');
});

QUnit.test('calculates score for 0 lines', assert => {
    const calculator = new ScoreCalculator();
    const score = calculator.calculate(0, 1);
    assert.equal(score, 0, 'score for 0 lines is 0');
});

QUnit.test('calculates score for high level', assert => {
    const calculator = new ScoreCalculator();
    const score = calculator.calculate(4, 10);
    assert.equal(score, 8000, 'score is correctly calculated for high level');
});
