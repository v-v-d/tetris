/**
 * Class: TouchInputHandler
 * Handles touch input for mobile devices
 */
class TouchInputHandler {
    /**
     * @param {GameController} controller - Game controller
     */
    constructor(controller) {
        this._controller = controller;
        this._touchStartX = 0;
        this._touchStartY = 0;
        this._touchStartTime = 0;
        this._swipeThreshold = 30;
        this._tapThreshold = 200;
        this._isInitialized = false;
    }

    /**
     * Initializes touch event listeners
     */
    initialize() {
        if (this._isInitialized) {
            return;
        }

        // Touch buttons
        this._setupTouchButton('touch-left', () => this._controller.moveLeft());
        this._setupTouchButton('touch-right', () => this._controller.moveRight());
        this._setupTouchButton('touch-down', () => this._controller.moveDown());
        this._setupTouchButton('touch-rotate', () => this._controller.rotate());
        this._setupTouchButton('touch-drop', () => this._controller.hardDrop());

        // Swipe gestures on game board
        const gameBoard = document.getElementById('game-board');
        if (gameBoard) {
            gameBoard.addEventListener('touchstart', this._handleTouchStart.bind(this), { passive: false });
            gameBoard.addEventListener('touchmove', this._handleTouchMove.bind(this), { passive: false });
            gameBoard.addEventListener('touchend', this._handleTouchEnd.bind(this), { passive: false });
        }

        // Prevent default touch behaviors on the entire page
        document.addEventListener('touchmove', this._preventDefaultTouchMove.bind(this), { passive: false });

        this._isInitialized = true;
    }

    /**
     * Sets up a touch button with both touch and click events
     * @private
     * @param {string} buttonId - Button element ID
     * @param {Function} action - Action to perform
     */
    _setupTouchButton(buttonId, action) {
        const button = document.getElementById(buttonId);
        if (!button) {
            return;
        }

        // Touch events for mobile
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            button.classList.add('active');
            action();
        }, { passive: false });

        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            button.classList.remove('active');
        }, { passive: false });

        // Click events for desktop testing
        button.addEventListener('click', (e) => {
            e.preventDefault();
            action();
        });

        // Prevent double-tap zoom
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });
    }

    /**
     * Handles touch start event
     * @private
     * @param {TouchEvent} e - Touch event
     */
    _handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this._touchStartX = touch.clientX;
        this._touchStartY = touch.clientY;
        this._touchStartTime = Date.now();
    }

    /**
     * Handles touch move event
     * @private
     * @param {TouchEvent} e - Touch event
     */
    _handleTouchMove(e) {
        e.preventDefault();
    }

    /**
     * Handles touch end event
     * @private
     * @param {TouchEvent} e - Touch event
     */
    _handleTouchEnd(e) {
        e.preventDefault();
        const touch = e.changedTouches[0];
        const touchEndX = touch.clientX;
        const touchEndY = touch.clientY;
        const touchEndTime = Date.now();

        const deltaX = touchEndX - this._touchStartX;
        const deltaY = touchEndY - this._touchStartY;
        const deltaTime = touchEndTime - this._touchStartTime;

        // Check if it's a tap (short duration, small movement)
        if (deltaTime < this._tapThreshold && 
            Math.abs(deltaX) < this._swipeThreshold && 
            Math.abs(deltaY) < this._swipeThreshold) {
            // Tap - hard drop
            this._controller.hardDrop();
            return;
        }

        // Check for swipe gestures
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (Math.abs(deltaX) > this._swipeThreshold) {
                if (deltaX > 0) {
                    this._controller.moveRight();
                } else {
                    this._controller.moveLeft();
                }
            }
        } else {
            // Vertical swipe
            if (Math.abs(deltaY) > this._swipeThreshold) {
                if (deltaY > 0) {
                    // Swipe down - hard drop
                    this._controller.hardDrop();
                } else {
                    // Swipe up - rotate
                    this._controller.rotate();
                }
            }
        }
    }

    /**
     * Prevents default touch move behavior (scrolling)
     * @private
     * @param {TouchEvent} e - Touch event
     */
    _preventDefaultTouchMove(e) {
        // Allow scrolling only on non-game elements
        const target = e.target;
        const gameBoard = document.getElementById('game-board');
        const touchControls = document.querySelector('.touch-controls');
        
        if (gameBoard && gameBoard.contains(target)) {
            e.preventDefault();
        }
        
        if (touchControls && touchControls.contains(target)) {
            e.preventDefault();
        }
    }

    /**
     * Destroys touch event listeners
     */
    destroy() {
        if (!this._isInitialized) {
            return;
        }

        // Remove touch button listeners
        ['touch-left', 'touch-right', 'touch-down', 'touch-rotate', 'touch-drop'].forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                const newButton = button.cloneNode(true);
                button.parentNode.replaceChild(newButton, button);
            }
        });

        // Remove swipe listeners
        const gameBoard = document.getElementById('game-board');
        if (gameBoard) {
            const newGameBoard = gameBoard.cloneNode(true);
            gameBoard.parentNode.replaceChild(newGameBoard, gameBoard);
        }

        this._isInitialized = false;
    }
}
