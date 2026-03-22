/**
 * Implementation: CanvasRenderer
 * Renders the game to HTML5 Canvas
 * NOT TESTED - Infrastructure layer
 */
class CanvasRenderer {
    /**
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {number} cellSize - Size of each cell in pixels
     */
    constructor(canvas, cellSize = 30) {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
        this._cellSize = cellSize;
    }

    /**
     * Renders the game board
     * @param {GameBoard} board - Game board to render
     */
    renderBoard(board) {
        this._clearCanvas();
        
        for (let y = 0; y < board.height; y++) {
            for (let x = 0; x < board.width; x++) {
                const position = new Position(x, y);
                const color = board.getCell(position);
                
                if (color) {
                    this._drawCell(x, y, color.hex);
                } else {
                    this._drawEmptyCell(x, y);
                }
            }
        }
    }

    /**
     * Renders a tetromino
     * @param {Tetromino} tetromino - Tetromino to render
     */
    renderTetromino(tetromino) {
        if (!tetromino) {
            return;
        }
        
        const cells = tetromino.getOccupiedCells();
        
        for (const cell of cells) {
            this._drawCell(cell.x, cell.y, tetromino.color.hex);
        }
    }

    /**
     * Renders the next piece preview
     * @param {Tetromino} tetromino - Tetromino to render
     */
    renderNextPiece(tetromino) {
        if (!tetromino) {
            return;
        }
        
        this._clearCanvas();
        
        const matrix = tetromino.shape.getMatrix();
        const offsetX = (this._canvas.width / this._cellSize - matrix[0].length) / 2;
        const offsetY = (this._canvas.height / this._cellSize - matrix.length) / 2;
        
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] === 1) {
                    this._drawCell(x + offsetX, y + offsetY, tetromino.color.hex);
                }
            }
        }
    }

    /**
     * Clears the canvas
     * @private
     */
    _clearCanvas() {
        this._ctx.fillStyle = '#1a1a2e';
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    /**
     * Draws a filled cell
     * @private
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {string} color - Hex color
     */
    _drawCell(x, y, color) {
        const px = x * this._cellSize;
        const py = y * this._cellSize;
        
        // Fill
        this._ctx.fillStyle = color;
        this._ctx.fillRect(px, py, this._cellSize, this._cellSize);
        
        // Border
        this._ctx.strokeStyle = '#000';
        this._ctx.lineWidth = 1;
        this._ctx.strokeRect(px, py, this._cellSize, this._cellSize);
        
        // Highlight
        this._ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this._ctx.fillRect(px, py, this._cellSize, 2);
        this._ctx.fillRect(px, py, 2, this._cellSize);
    }

    /**
     * Draws an empty cell
     * @private
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    _drawEmptyCell(x, y) {
        const px = x * this._cellSize;
        const py = y * this._cellSize;
        
        this._ctx.fillStyle = '#16213e';
        this._ctx.fillRect(px, py, this._cellSize, this._cellSize);
        
        this._ctx.strokeStyle = '#0f3460';
        this._ctx.lineWidth = 1;
        this._ctx.strokeRect(px, py, this._cellSize, this._cellSize);
    }
}
