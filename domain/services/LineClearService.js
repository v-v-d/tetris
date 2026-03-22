/**
 * Service: LineClearService
 * Handles line clearing logic
 */
class LineClearService {
    /**
     * Clears all full rows from the board
     * @param {GameBoard} board - Game board
     * @returns {number} Number of lines cleared
     */
    clearLines(board) {
        const fullRows = board.getFullRows();
        
        // Sort in descending order to remove from bottom to top
        fullRows.sort((a, b) => b - a);
        
        for (const row of fullRows) {
            board.removeRow(row);
        }
        
        return fullRows.length;
    }

    /**
     * Gets the number of full rows without clearing them
     * @param {GameBoard} board - Game board
     * @returns {number} Number of full rows
     */
    getFullRowCount(board) {
        return board.getFullRows().length;
    }

    /**
     * Checks if there are any full rows
     * @param {GameBoard} board - Game board
     * @returns {boolean}
     */
    hasFullRows(board) {
        return this.getFullRowCount(board) > 0;
    }

    /**
     * Gets the indices of full rows
     * @param {GameBoard} board - Game board
     * @returns {number[]} Array of row indices
     */
    getFullRowIndices(board) {
        return board.getFullRows();
    }

    /**
     * Simulates line clearing without modifying the board
     * @param {GameBoard} board - Game board
     * @returns {GameBoard} New board with lines cleared
     */
    simulateClearLines(board) {
        const clonedBoard = board.clone();
        this.clearLines(clonedBoard);
        return clonedBoard;
    }
}
