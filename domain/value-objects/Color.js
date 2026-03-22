/**
 * Value Object: Color
 * Represents the color of a tetromino
 * Immutable - once created, cannot be modified
 */
class Color {
    /**
     * @param {string} hex - Hex color code
     */
    constructor(hex) {
        if (!this.isValidHex(hex)) {
            throw new Error(`Invalid hex color: ${hex}`);
        }
        this._hex = hex;
        Object.freeze(this);
    }

    /**
     * Standard colors for each tetromino type
     */
    static COLORS = {
        I: new Color('#00f0f0'),
        O: new Color('#f0f000'),
        T: new Color('#a000f0'),
        S: new Color('#00f000'),
        Z: new Color('#f00000'),
        J: new Color('#0000f0'),
        L: new Color('#f0a000')
    };

    /**
     * Gets color for tetromino type
     * @param {string} type - Tetromino type
     * @returns {Color}
     */
    static forType(type) {
        return Color.COLORS[type];
    }

    get hex() {
        return this._hex;
    }

    /**
     * Validates hex color format
     * @param {string} hex
     * @returns {boolean}
     */
    isValidHex(hex) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    }

    /**
     * Checks if this color equals another
     * @param {Color} other
     * @returns {boolean}
     */
    equals(other) {
        if (!(other instanceof Color)) {
            return false;
        }
        return this._hex === other._hex;
    }

    /**
     * Creates a copy of this color
     * @returns {Color}
     */
    clone() {
        return new Color(this._hex);
    }

    toString() {
        return `Color(${this._hex})`;
    }
}
