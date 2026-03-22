/**
 * Service: ScoreCalculator
 * Handles score calculation based on lines cleared
 */
class ScoreCalculator {
    /**
     * Standard scoring system
     */
    static SCORES = {
        1: 100,   // Single
        2: 300,   // Double
        3: 500,   // Triple
        4: 800    // Tetris
    };

    /**
     * Calculates score for cleared lines
     * @param {number} linesCleared - Number of lines cleared
     * @param {number} level - Current level
     * @returns {number} Score earned
     */
    calculateScore(linesCleared, level = 1) {
        if (linesCleared < 1 || linesCleared > 4) {
            return 0;
        }
        
        const baseScore = ScoreCalculator.SCORES[linesCleared] || 0;
        return baseScore * level;
    }

    /**
     * Calculates level based on lines cleared
     * @param {number} totalLines - Total lines cleared
     * @returns {number} Current level
     */
    calculateLevel(totalLines) {
        return Math.floor(totalLines / 10) + 1;
    }

    /**
     * Calculates drop speed based on level
     * @param {number} level - Current level
     * @returns {number} Drop interval in milliseconds
     */
    calculateDropInterval(level) {
        // Standard Tetris speed curve
        const baseInterval = 1000;
        const minInterval = 100;
        const reduction = Math.min(level - 1, 9) * 100;
        
        return Math.max(baseInterval - reduction, minInterval);
    }

    /**
     * Gets the score for a specific number of lines
     * @param {number} linesCleared - Number of lines cleared
     * @returns {number} Base score
     */
    getBaseScore(linesCleared) {
        return ScoreCalculator.SCORES[linesCleared] || 0;
    }
}
