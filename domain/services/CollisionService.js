/**
 * Service: CollisionService
 * Handles collision detection for tetrominos
 */
class CollisionService {
    /**
     * Checks if a tetromino has a collision with the board
     * @param {Tetromino} tetromino - Tetromino to check
     * @param {GameBoard} board - Game board
     * @returns {boolean}
     */
    hasCollision(tetromino, board) {
        return !board.canPlace(tetromino);
    }

    /**
     * Checks if a tetromino can move in a direction
     * @param {Tetromino} tetromino - Current tetromino
     * @param {GameBoard} board - Game board
     * @param {number} dx - X direction
     * @param {number} dy - Y direction
     * @returns {boolean}
     */
    canMove(tetromino, board, dx, dy) {
        const moved = tetromino.move(dx, dy);
        return board.canPlace(moved);
    }

    /**
     * Checks if a tetromino can move left
     * @param {Tetromino} tetromino - Current tetromino
     * @param {GameBoard} board - Game board
     * @returns {boolean}
     */
    canMoveLeft(tetromino, board) {
        return this.canMove(tetromino, board, -1, 0);
    }

    /**
     * Checks if a tetromino can move right
     * @param {Tetromino} tetromino - Current tetromino
     * @param {GameBoard} board - Game board
     * @returns {boolean}
     */
    canMoveRight(tetromino, board) {
        return this.canMove(tetromino, board, 1, 0);
    }

    /**
     * Checks if a tetromino can move down
     * @param {Tetromino} tetromino - Current tetromino
     * @param {GameBoard} board - Game board
     * @returns {boolean}
     */
    canMoveDown(tetromino, board) {
        return this.canMove(tetromino, board, 0, 1);
    }

    /**
     * Checks if a tetromino has hit the bottom
     * @param {Tetromino} tetromino - Current tetromino
     * @param {GameBoard} board - Game board
     * @returns {boolean}
     */
    hasHitBottom(tetromino, board) {
        return !this.canMoveDown(tetromino, board);
    }

    /**
     * Checks if a tetromino is out of bounds
     * @param {Tetromino} tetromino - Tetromino to check
     * @param {GameBoard} board - Game board
     * @returns {boolean}
     */
    isOutOfBounds(tetromino, board) {
        const cells = tetromino.getOccupiedCells();
        
        for (const cell of cells) {
            if (!board.isValidPosition(cell)) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Checks if a tetromino overlaps with occupied cells
     * @param {Tetromino} tetromino - Tetromino to check
     * @param {GameBoard} board - Game board
     * @returns {boolean}
     */
    hasOverlap(tetromino, board) {
        const cells = tetromino.getOccupiedCells();
        
        for (const cell of cells) {
            if (!board.isEmpty(cell)) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Gets the distance a tetromino can move down before collision
     * @param {Tetromino} tetromino - Current tetromino
     * @param {GameBoard} board - Game board
     * @returns {number} Distance in cells
     */
    getDropDistance(tetromino, board) {
        let distance = 0;
        let testTetromino = tetromino;
        
        while (this.canMoveDown(testTetromino, board)) {
            testTetromino = testTetromino.move(0, 1);
            distance++;
        }
        
        return distance;
    }

    /**
     * Drops a tetromino to the bottom
     * @param {Tetromino} tetromino - Current tetromino
     * @param {GameBoard} board - Game board
     * @returns {Tetromino} Dropped tetromino
     */
    hardDrop(tetromino, board) {
        const distance = this.getDropDistance(tetromino, board);
        return tetromino.move(0, distance);
    }
}
