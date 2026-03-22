/**
 * Service: RotationService
 * Handles rotation logic for tetrominos
 */
class RotationService {
    /**
     * Checks if a tetromino can be rotated at its current position
     * @param {Tetromino} tetromino - Current tetromino
     * @param {GameBoard} board - Game board
     * @returns {boolean}
     */
    canRotate(tetromino, board) {
        const rotated = tetromino.rotate();
        return board.canPlace(rotated);
    }

    /**
     * Rotates a tetromino if possible
     * @param {Tetromino} tetromino - Current tetromino
     * @param {GameBoard} board - Game board
     * @returns {Tetromino|null} Rotated tetromino or null if rotation not possible
     */
    rotate(tetromino, board) {
        if (this.canRotate(tetromino, board)) {
            return tetromino.rotate();
        }
        return null;
    }

    /**
     * Attempts wall kick - tries to rotate and adjust position
     * @param {Tetromino} tetromino - Current tetromino
     * @param {GameBoard} board - Game board
     * @returns {Tetromino|null} Rotated tetromino with adjusted position or null
     */
    rotateWithWallKick(tetromino, board) {
        const rotated = tetromino.rotate();
        
        // Try original position first
        if (board.canPlace(rotated)) {
            return rotated;
        }
        
        // Try wall kicks (left, right, up)
        const kicks = [
            { dx: -1, dy: 0 },  // Left
            { dx: 1, dy: 0 },   // Right
            { dx: -2, dy: 0 },  // Left 2
            { dx: 2, dy: 0 },   // Right 2
            { dx: 0, dy: -1 },  // Up
            { dx: -1, dy: -1 }, // Left + Up
            { dx: 1, dy: -1 }   // Right + Up
        ];
        
        for (const kick of kicks) {
            const kicked = rotated.move(kick.dx, kick.dy);
            if (board.canPlace(kicked)) {
                return kicked;
            }
        }
        
        return null;
    }
}
