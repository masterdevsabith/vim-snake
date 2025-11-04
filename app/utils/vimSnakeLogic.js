export class vimSnakeLogic {
	constructor(ctx, gameWidth, gameHeight, scoreText) {
		this.ctx = ctx;
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.scoreText = scoreText;

		this.boardBackgroundColor = "black";
		this.snakeColor = "green";
		this.snakeBorderColor = "darkgreen";
		this.foodColor = "red";
		this.unitSize = 25;

		this.running = false;
		this.xVelocity = this.unitSize;
		this.yVelocity = 0;

		this.foodX;
		this.foodY;
		this.score = 0;

		this.snake = [
			{ x: this.unitSize * 4, y: 0 },
			{ x: this.unitSize * 3, y: 0 },
			{ x: this.unitSize * 2, y: 0 },
			{ x: this.unitSize * 1, y: 0 },
			{ x: 0, y: 0 },
		];
	}

	gameStart() {}

	nextTick() {}

	clearBoard() {}

	createFood() {}

	drawFood() {}

	moveSnake() {}

	drawSnake() {}

	changeDirection() {}

	checkGameOver() {}

	displayGameOver() {}

	resetGame() {}
}
