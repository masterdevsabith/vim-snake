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

	gameStart() {
		this.running = true;
		this.createFood();
		this.drawFood();
		this.nextTick();
	}

	nextTick() {
		if (this.running) {
			this.drawSnake();
		}
	}

	clearBoard() {}

	createFood() {
		const randomFood = (min, max) => {
			const randNum =
				Math.round((Math.random() * (max - min) + min) / this.unitSize) *
				this.unitSize;

			return randNum;
		};

		this.foodX = randomFood(0, this.gameWidth - this.unitSize);
		this.foodY = randomFood(0, this.gameHeight - this.unitSize);
	}

	drawFood() {
		this.ctx.fillStyle = this.foodColor;
		this.ctx.fillRect(this.foodX, this.foodY, this.unitSize, this.unitSize);
	}

	moveSnake() {}

	drawSnake() {
		this.ctx.fillStyle = "#00ba05";
		this.ctx.strokeStyle = this.snakeBorderColor;
		this.snake.forEach((snakePart, index) => {
			this.ctx.fillRect(snakePart.x, snakePart.y, this.unitSize, this.unitSize);
			this.ctx.strokeRect(
				snakePart.x,
				snakePart.y,
				this.unitSize,
				this.unitSize
			);

			if (index == 0) {
				this.ctx.fillStyle = this.snakeColor;
			}
		});
	}

	changeDirection() {}

	checkGameOver() {}

	displayGameOver() {}

	resetGame() {}
}
