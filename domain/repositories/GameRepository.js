/**
 * Interface: GameRepository
 * Abstract repository for game state persistence
 * Follows Dependency Inversion Principle
 */
class GameRepository {
    /**
     * Saves the game state
     * @param {Object} gameState - Game state to save
     * @returns {Promise<void>}
     */
    async save(gameState) {
        throw new Error('Method not implemented');
    }

    /**
     * Loads the game state
     * @returns {Promise<Object|null>} Game state or null if not found
     */
    async load() {
        throw new Error('Method not implemented');
    }

    /**
     * Deletes the saved game state
     * @returns {Promise<void>}
     */
    async delete() {
        throw new Error('Method not implemented');
    }

    /**
     * Checks if a saved game exists
     * @returns {Promise<boolean>}
     */
    async exists() {
        throw new Error('Method not implemented');
    }
}
