import {Snake} from "./Snake.js";
import {Canvas} from "./Canvas.js";

const snake = new Snake();
const gameOver = false;
const canvas = new Canvas(snake, gameOver);

setInterval(gameLoop, 250);

function gameLoop() {
    if (canvas.shouldStopRendering()) {
        canvas.renderGameOver();
    } else {
        canvas.renderGameFrame();
    }
}