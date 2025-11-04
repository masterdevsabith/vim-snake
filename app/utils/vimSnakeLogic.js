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
			setTimeout(() => {
				this.clearBoard();
				this.drawFood();
				this.moveSnake();
				this.drawSnake();
				this.checkGameOver();
				this.nextTick();
			}, 80);
		} else {
			this.displayGameOver();
		}
	}

	clearBoard() {
		this.ctx.fillStyle = this.boardBackgroundColor;
		this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
	}

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

	moveSnake() {
		const head = {
			x: this.snake[0].x + this.xVelocity,
			y: this.snake[0].y + this.yVelocity,
		};
		this.snake.unshift(head);
		if (this.snake[0].x == this.foodX && this.snake[0].y == this.foodY) {
			this.score += 1;
			this.scoreText.current.textContent = this.score;
			this.createFood();
		} else {
			this.snake.pop();
		}
	}

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

	changeDirection(event) {}

	checkGameOver() {}

	displayGameOver() {}

	resetGame() {}
}
