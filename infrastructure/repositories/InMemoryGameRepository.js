/**
 * Implementation: InMemoryGameRepository
 * In-memory implementation of GameRepository
 * Follows Dependency Inversion Principle
 */
class InMemoryGameRepository extends GameRepository {
    constructor() {
        super();
        this._storage = null;
    }

    /**
     * Saves the game state
     * @param {Object} gameState - Game state to save
     * @returns {Promise<void>}
     */
    async save(gameState) {
        this._storage = JSON.stringify(gameState);
    }

    /**
     * Loads the game state
     * @returns {Promise<Object|null>} Game state or null if not found
     */
    async load() {
        if (!this._storage) {
            return null;
        }
        
        try {
            return JSON.parse(this._storage);
        } catch (error) {
            return null;
        }
    }

    /**
     * Deletes the saved game state
     * @returns {Promise<void>}
     */
    async delete() {
        this._storage = null;
    }

    /**
     * Checks if a saved game exists
     * @returns {Promise<boolean>}
     */
    async exists() {
        return this._storage !== null;
    }
}
