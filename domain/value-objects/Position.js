/**
 * Value Object: Position
 * Represents a position on the game board with x and y coordinates
 * Immutable - once created, cannot be modified
 */
class Position {
    /**
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    constructor(x, y) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error('Position coordinates must be numbers');
        }
        this._x = x;
        this._y = y;
        Object.freeze(this);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    /**
     * Creates a new position with offset
     * @param {number} dx - X offset
     * @param {number} dy - Y offset
     * @returns {Position} New position
     */
    offset(dx, dy) {
        return new Position(this._x + dx, this._y + dy);
    }

    /**
     * Checks if this position equals another
     * @param {Position} other - Other position
     * @returns {boolean}
     */
    equals(other) {
        if (!(other instanceof Position)) {
            return false;
        }
        return this._x === other._x && this._y === other._y;
    }

    /**
     * Creates a copy of this position
     * @returns {Position}
     */
    clone() {
        return new Position(this._x, this._y);
    }

    toString() {
        return `Position(${this._x}, ${this._y})`;
    }
}
