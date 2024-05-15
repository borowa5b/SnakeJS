import {CANVAS_DIMENSIONS} from "./Constants.js";

const DEFAULT_SNAKE_LENGHT = 3;

export class Snake {

    #isDirectionChangeAllowed;
    #movingDirection;
    #snakeLength;
    #snakeHead;
    #snakeBody;
    #appleLocation;

    constructor() {
        this.#isDirectionChangeAllowed = true;
        this.#movingDirection = {x: 0, y: 1};
        this.#snakeLength = DEFAULT_SNAKE_LENGHT;
        this.#snakeHead = this.#generateRandomLocation();
        this.#snakeBody = [];
        this.#appleLocation = this.#generateRandomLocation();

        this.#addArrowKeyListener();
    }

    resolveSnakeBodyMovement() {
        this.#snakeBody.unshift({x: this.#snakeHead.x, y: this.#snakeHead.y});
        if (this.#snakeBody.length > this.#snakeLength) this.#snakeBody.pop();
        this.#resolveNextSnakeHeadCoordinates();
    }

    allowDirectionChange() {
        this.#isDirectionChangeAllowed = true;
    }

    onEachBodyElement(action) {
        this.#snakeBody.forEach(action);
    }

    onGameOver(action) {
        this.#snakeBody.filter((_, index) => index !== 0).forEach(element => {
            if (element.x === this.#snakeHead.x && element.y === this.#snakeHead.y) {
                action();
            }
        });
    }

    handleAppleEating() {
        if (this.#snakeHead.x === this.#appleLocation.x && this.#snakeHead.y === this.#appleLocation.y) {
            this.#onAppleEat();
        }
    }

    getAppleLocation() {
        return this.#appleLocation;
    }

    #onAppleEat() {
        this.#appleLocation = this.#generateRandomLocation();
        this.#snakeLength++;
    }

    #resolveNextSnakeHeadCoordinates() {
        let newX = this.#snakeHead.x + (this.#movingDirection.x * 20);
        let newY = this.#snakeHead.y + (this.#movingDirection.y * 20);

        if (newX === CANVAS_DIMENSIONS.width) newX = 0;
        if (newY === CANVAS_DIMENSIONS.height) newY = 0;

        if (newX < 0) newX = CANVAS_DIMENSIONS.width - 20;
        if (newY < 0) newY = CANVAS_DIMENSIONS.height - 20;

        this.#snakeHead.x = newX;
        this.#snakeHead.y = newY;
    }

    #addArrowKeyListener() {
        document.addEventListener('keydown', event => {
            if (!this.#isDirectionChangeAllowed) return;

            let newMovingDirection;
            switch (event.key) {
                case 'ArrowDown':
                    newMovingDirection = {x: 0, y: 1};
                    break;
                case 'ArrowUp':
                    newMovingDirection = {x: 0, y: -1};
                    break;
                case 'ArrowLeft':
                    newMovingDirection = {x: -1, y: 0};
                    break;
                case 'ArrowRight':
                    newMovingDirection = {x: 1, y: 0};
                    break;
            }

            // block attemps to move in opposite direction
            if (Math.abs(newMovingDirection.x) === Math.abs(this.#movingDirection.x) || Math.abs(newMovingDirection.y) === Math.abs(this.#movingDirection.y)) return;

            // change to new direction
            this.#movingDirection = newMovingDirection;

            // block direction change for a frame
            this.#isDirectionChangeAllowed = false;
        });
    }

    #generateRandomLocation() {
        return {
            x: this.#generateRandomNumberDividableBy20(CANVAS_DIMENSIONS.width),
            y: this.#generateRandomNumberDividableBy20(CANVAS_DIMENSIONS.height)
        };
    }

    #generateRandomNumberDividableBy20(max) {
        return Math.floor(Math.floor(Math.random() * max + 1) / 20) * 20;
    }
}