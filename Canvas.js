import {CANVAS_DIMENSIONS} from "./Constants.js";

export class Canvas {

    #canvas;
    #canvasContext;
    #snake;
    #shouldStopRendering;

    constructor(snake) {
        this.#snake = snake;
        this.#canvas = document.querySelector('#snake-canvas');
        this.#canvasContext = this.#canvas.getContext('2d');
        this.#canvas.width = CANVAS_DIMENSIONS.width;
        this.#canvas.height = CANVAS_DIMENSIONS.height;
        this.#shouldStopRendering = false;
    }

    renderGameFrame() {
        // render canvas with black background
        this.#canvasContext.fillStyle = 'black';
        this.#canvasContext.fillRect(0, 0, CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height);

        // resolve snake body
        this.#snake.resolveSnakeBodyMovement();

        // render snake
        this.#canvasContext.fillStyle = 'green';
        this.#snake.onEachBodyElement(element => this.#canvasContext.fillRect(element.x, element.y, 16, 16));

        // render apple
        let appleLocation = this.#snake.getAppleLocation();
        this.#canvasContext.fillStyle = 'red';
        this.#canvasContext.fillRect(appleLocation.x, appleLocation.y, 16, 16);

        // handle apple eating
        this.#snake.handleAppleEating();

        // handle game over
        this.#snake.onGameOver(() => this.#shouldStopRendering = true);

        // allow direction change at the end of frame
        this.#snake.allowDirectionChange();
    }

    renderGameOver() {
        this.#canvasContext.fillStyle = 'red';
        this.#canvasContext.font = '72px Arial';
        this.#canvasContext.fillText('Game over', 220, 100);
    }

    shouldStopRendering() {
        return this.#shouldStopRendering;
    }
}