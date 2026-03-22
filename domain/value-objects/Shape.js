/**
 * Value Object: Shape
 * Represents the shape of a tetromino
 * Immutable - once created, cannot be modified
 */
class Shape {
    /**
     * @param {string} type - Type of tetromino (I, O, T, S, Z, J, L)
     * @param {number} rotation - Rotation state (0, 1, 2, 3)
     */
    constructor(type, rotation = 0) {
        if (!this.isValidType(type)) {
            throw new Error(`Invalid tetromino type: ${type}`);
        }
        if (rotation < 0 || rotation > 3) {
            throw new Error('Rotation must be between 0 and 3');
        }
        
        this._type = type;
        this._rotation = rotation;
        Object.freeze(this);
    }

    static TYPES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

    // Static shape instances for convenience
    static I = new Shape('I', 0);
    static O = new Shape('O', 0);
    static T = new Shape('T', 0);
    static S = new Shape('S', 0);
    static Z = new Shape('Z', 0);
    static J = new Shape('J', 0);
    static L = new Shape('L', 0);

    /**
     * All tetromino shapes for each rotation state
     */
    static SHAPES = {
        I: [
            [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
            [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
            [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
        ],
        O: [
            [[1, 1], [1, 1]],
            [[1, 1], [1, 1]],
            [[1, 1], [1, 1]],
            [[1, 1], [1, 1]]
        ],
        T: [
            [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
            [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
            [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
        ],
        S: [
            [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
            [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
            [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
            [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
        ],
        Z: [
            [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
            [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
            [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
        ],
        J: [
            [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
            [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
            [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
        ],
        L: [
            [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
            [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
            [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
            [[1, 1, 0], [0, 1, 0], [0, 1, 0]]
        ]
    };

    get type() {
        return this._type;
    }

    get rotation() {
        return this._rotation;
    }

    /**
     * Gets the shape matrix for current rotation
     * @returns {number[][]} 2D array representing the shape
     */
    getMatrix() {
        return Shape.SHAPES[this._type][this._rotation];
    }

    /**
     * Gets the width of the shape
     * @returns {number}
     */
    getWidth() {
        return this.getMatrix()[0].length;
    }

    /**
     * Gets the height of the shape
     * @returns {number}
     */
    getHeight() {
        return this.getMatrix().length;
    }

    /**
     * Creates a new shape with next rotation
     * @returns {Shape}
     */
    rotate() {
        return new Shape(this._type, (this._rotation + 1) % 4);
    }

    /**
     * Creates a new shape with previous rotation
     * @returns {Shape}
     */
    rotateBack() {
        return new Shape(this._type, (this._rotation + 3) % 4);
    }

    /**
     * Checks if type is valid
     * @param {string} type
     * @returns {boolean}
     */
    isValidType(type) {
        return Shape.TYPES.includes(type);
    }

    /**
     * Checks if this shape equals another
     * @param {Shape} other
     * @returns {boolean}
     */
    equals(other) {
        if (!(other instanceof Shape)) {
            return false;
        }
        return this._type === other._type && this._rotation === other._rotation;
    }

    /**
     * Creates a copy of this shape
     * @returns {Shape}
     */
    clone() {
        return new Shape(this._type, this._rotation);
    }

    toString() {
        return `Shape(${this._type}, rotation: ${this._rotation})`;
    }

    /**
     * Gets all shape instances
     * @returns {Shape[]}
     */
    static getAllShapes() {
        return [Shape.I, Shape.O, Shape.T, Shape.S, Shape.Z, Shape.J, Shape.L];
    }

    /**
     * Creates a random shape
     * @returns {Shape}
     */
    static createRandom() {
        const types = Shape.TYPES;
        const randomType = types[Math.floor(Math.random() * types.length)];
        return new Shape(randomType, 0);
    }
}
