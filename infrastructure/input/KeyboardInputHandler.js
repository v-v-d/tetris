/**
 * Implementation: KeyboardInputHandler
 * Handles keyboard input for the game
 * NOT TESTED - Infrastructure layer
 */
class KeyboardInputHandler {
    /**
     * @param {Function} onLeft - Callback for left arrow
     * @param {Function} onRight - Callback for right arrow
     * @param {Function} onDown - Callback for down arrow
     * @param {Function} onRotate - Callback for up arrow
     * @param {Function} onHardDrop - Callback for space
     * @param {Function} onPause - Callback for P key
     */
    constructor(onLeft, onRight, onDown, onRotate, onHardDrop, onPause) {
        this._onLeft = onLeft;
        this._onRight = onRight;
        this._onDown = onDown;
        this._onRotate = onRotate;
        this._onHardDrop = onHardDrop;
        this._onPause = onPause;
        this._isSetup = false;
    }

    /**
     * Sets up event listeners
     */
    setup() {
        if (this._isSetup) {
            return;
        }
        
        document.addEventListener('keydown', this._handleKeyDown.bind(this));
        this._isSetup = true;
    }

    /**
     * Removes event listeners
     */
    teardown() {
        if (!this._isSetup) {
            return;
        }
        
        document.removeEventListener('keydown', this._handleKeyDown.bind(this));
        this._isSetup = false;
    }

    /**
     * Handles key down events
     * @private
     * @param {KeyboardEvent} event
     */
    _handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                this._onLeft();
                break;
            case 'ArrowRight':
                event.preventDefault();
                this._onRight();
                break;
            case 'ArrowDown':
                event.preventDefault();
                this._onDown();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this._onRotate();
                break;
            case ' ':
                event.preventDefault();
                this._onHardDrop();
                break;
            case 'p':
            case 'P':
                event.preventDefault();
                this._onPause();
                break;
        }
    }
}
