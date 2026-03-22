/**
 * Entity: GameBoard
 * Represents the game board with a grid of cells
 */
class GameBoard {
    /**
     * @param {number} width - Board width (default 10)
     * @param {number} height - Board height (default 20)
     */
    constructor(width = 10, height = 20) {
        if (width <= 0 || height <= 0) {
            throw new Error('Board dimensions must be positive');
        }
        
        this._width = width;
        this._height = height;
        this._grid = this._createEmptyGrid();
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    /**
     * Creates an empty grid
     * @returns {Color[][]} 2D array of colors (null for empty)
     */
    _createEmptyGrid() {
        const grid = [];
        for (let y = 0; y < this._height; y++) {
            grid[y] = [];
            for (let x = 0; x < this._width; x++) {
                grid[y][x] = null;
            }
        }
        return grid;
    }

    /**
     * Gets the color at a specific position
     * @param {Position} position
     * @returns {Color|null}
     */
    getCell(position) {
        if (!this.isValidPosition(position)) {
            return null;
        }
        return this._grid[position.y][position.x];
    }

    /**
     * Sets the color at a specific position
     * @param {Position} position
     * @param {Color|null} color
     */
    setCell(position, color) {
        if (!this.isValidPosition(position)) {
            throw new Error('Invalid position');
        }
        this._grid[position.y][position.x] = color;
    }

    /**
     * Checks if a position is within board bounds
     * @param {Position} position
     * @returns {boolean}
     */
    isValidPosition(position) {
        return position.x >= 0 && 
               position.x < this._width && 
               position.y >= 0 && 
               position.y < this._height;
    }

    /**
     * Checks if a position is empty
     * @param {Position} position
     * @returns {boolean}
     */
    isEmpty(position) {
        if (!this.isValidPosition(position)) {
            return false;
        }
        return this._grid[position.y][position.x] === null;
    }

    /**
     * Checks if a tetromino can be placed at its current position
     * @param {Tetromino} tetromino
     * @returns {boolean}
     */
    canPlace(tetromino) {
        const cells = tetromino.getOccupiedCells();
        
        for (const cell of cells) {
            if (!this.isValidPosition(cell) || !this.isEmpty(cell)) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Places a tetromino on the board
     * @param {Tetromino} tetromino
     */
    place(tetromino) {
        const cells = tetromino.getOccupiedCells();
        
        for (const cell of cells) {
            this.setCell(cell, tetromino.color);
        }
    }

    /**
     * Checks if a row is completely filled
     * @param {number} y - Row index
     * @returns {boolean}
     */
    isRowFull(y) {
        if (y < 0 || y >= this._height) {
            return false;
        }
        
        for (let x = 0; x < this._width; x++) {
            if (this._grid[y][x] === null) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Checks if a row is empty
     * @param {number} y - Row index
     * @returns {boolean}
     */
    isRowEmpty(y) {
        if (y < 0 || y >= this._height) {
            return false;
        }
        
        for (let x = 0; x < this._width; x++) {
            if (this._grid[y][x] !== null) {
                return false;
            }
        }
        
        return true;
    }

    /**
     * Removes a row and shifts rows above down
     * @param {number} y - Row index to remove
     */
    removeRow(y) {
        if (y < 0 || y >= this._height) {
            throw new Error('Invalid row index');
        }
        
        // Shift all rows above down
        for (let row = y; row > 0; row--) {
            this._grid[row] = [...this._grid[row - 1]];
        }
        
        // Clear the top row
        this._grid[0] = [];
        for (let x = 0; x < this._width; x++) {
            this._grid[0][x] = null;
        }
    }

    /**
     * Gets all full rows
     * @returns {number[]} Array of row indices
     */
    getFullRows() {
        const fullRows = [];
        
        for (let y = 0; y < this._height; y++) {
            if (this.isRowFull(y)) {
                fullRows.push(y);
            }
        }
        
        return fullRows;
    }

    /**
     * Clears the entire board
     */
    clear() {
        this._grid = this._createEmptyGrid();
    }

    /**
     * Gets a copy of the grid
     * @returns {Color[][]}
     */
    getGrid() {
        return this._grid.map(row => [...row]);
    }

    /**
     * Creates a copy of this board
     * @returns {GameBoard}
     */
    clone() {
        const board = new GameBoard(this._width, this._height);
        board._grid = this.getGrid();
        return board;
    }

    toString() {
        return `GameBoard(${this._width}x${this._height})`;
    }
}
