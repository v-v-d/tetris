/**
 * Entity: Tetromino
 * Represents a tetromino piece in the game
 */
class Tetromino {
    /**
     * @param {Shape} shape - Shape of the tetromino
     * @param {Position} position - Position on the board
     */
    constructor(shape, position) {
        if (!(shape instanceof Shape)) {
            throw new Error('Tetromino must have a Shape');
        }
        if (!(position instanceof Position)) {
            throw new Error('Tetromino must have a Position');
        }
        
        this._shape = shape;
        this._position = position;
        this._color = Color.forType(shape.type);
    }

    get shape() {
        return this._shape;
    }

    get position() {
        return this._position;
    }

    get color() {
        return this._color;
    }

    /**
     * Gets all occupied cells of this tetromino
     * @returns {Position[]} Array of positions
     */
    getOccupiedCells() {
        const matrix = this._shape.getMatrix();
        const cells = [];
        
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] === 1) {
                    cells.push(new Position(
                        this._position.x + x,
                        this._position.y + y
                    ));
                }
            }
        }
        
        return cells;
    }

    /**
     * Creates a new tetromino with rotated shape
     * @returns {Tetromino}
     */
    rotate() {
        return new Tetromino(
            this._shape.rotate(),
            this._position
        );
    }

    /**
     * Creates a new tetromino moved by offset
     * @param {number} dx - X offset
     * @param {number} dy - Y offset
     * @returns {Tetromino}
     */
    move(dx, dy) {
        return new Tetromino(
            this._shape,
            this._position.offset(dx, dy)
        );
    }

    /**
     * Creates a new tetromino at a specific position
     * @param {Position} newPosition
     * @returns {Tetromino}
     */
    moveTo(newPosition) {
        return new Tetromino(
            this._shape,
            newPosition
        );
    }

    /**
     * Creates a new tetromino with a specific shape
     * @param {Shape} newShape
     * @returns {Tetromino}
     */
    withShape(newShape) {
        return new Tetromino(
            newShape,
            this._position
        );
    }

    /**
     * Creates a random tetromino
     * @param {Position} position - Starting position
     * @returns {Tetromino}
     */
    static createRandom(position) {
        const types = Shape.TYPES;
        const randomType = types[Math.floor(Math.random() * types.length)];
        const shape = new Shape(randomType);
        return new Tetromino(shape, position);
    }

    /**
     * Creates a tetromino of specific type
     * @param {string} type - Tetromino type
     * @param {Position} position - Starting position
     * @returns {Tetromino}
     */
    static create(type, position) {
        const shape = new Shape(type);
        return new Tetromino(shape, position);
    }

    /**
     * Checks if this tetromino equals another
     * @param {Tetromino} other
     * @returns {boolean}
     */
    equals(other) {
        if (!(other instanceof Tetromino)) {
            return false;
        }
        return this._shape.equals(other._shape) && 
               this._position.equals(other._position);
    }

    /**
     * Creates a copy of this tetromino
     * @returns {Tetromino}
     */
    clone() {
        return new Tetromino(
            this._shape.clone(),
            this._position.clone()
        );
    }

    toString() {
        return `Tetromino(${this._shape.type}, ${this._position})`;
    }
}
