export class vimSnakeLogic {
	constructor(ctx, gameWidth, gameHeight, scoreText, h, j, k, l) {
		this.ctx = ctx;
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.scoreText = scoreText;
		this.h = h;
		this.j = j;
		this.k = k;
		this.l = l;

		this.hscore = 0;
		this.jscore = 0;
		this.kscore = 0;
		this.lscore = 0;

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

		this.failure_message = "Snake Hit The Wall";

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

		for (let i = 0; i < this.snake.length; i += 1) {
			if (this.foodX == this.snake[i].x && this.foodY == this.snake[i].y) {
				this.createFood();
			}
		}
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

	changeDirection(event) {
		const keypress = event.keyCode;
		const H = 72;
		const J = 74;
		const K = 75;
		const L = 76;

		const goingLeft = this.xVelocity == -this.unitSize;
		const goingRight = this.xVelocity == this.unitSize;

		const goingUp = this.yVelocity == -this.unitSize;
		const goignDown = this.yVelocity == this.unitSize;

		if (!this.running) return;
		switch (true) {
			case keypress == H && !goingRight:
				this.xVelocity = -this.unitSize;
				this.yVelocity = 0;
				this.hscore += 1;
				this.h.current.textContent = this.hscore;
				break;

			case keypress == L && !goingLeft:
				this.xVelocity = this.unitSize;
				this.yVelocity = 0;
				this.lscore += 1;
				this.l.current.textContent = this.lscore;
				break;

			case keypress == J && !goingUp:
				this.xVelocity = 0;
				this.yVelocity = this.unitSize;
				this.jscore += 1;
				this.j.current.textContent = this.jscore;
				break;

			case keypress == K && !goignDown:
				this.xVelocity = 0;
				this.yVelocity = -this.unitSize;
				this.kscore += 1;
				this.k.current.textContent = this.kscore;
				break;
		}
	}

	checkGameOver() {
		switch (true) {
			case this.snake[0].x < 0:
				this.running = false;
				break;

			case this.snake[0].x >= this.gameWidth:
				this.running = false;
				break;

			case this.snake[0].y < 0:
				this.running = false;
				break;

			case this.snake[0].y >= this.gameHeight:
				this.running = false;
				break;
		}

		for (let i = 1; i < this.snake.length; i += 1) {
			if (
				this.snake[i].x == this.snake[0].x &&
				this.snake[i].y == this.snake[0].y
			) {
				this.running = false;
				this.failure_message = "Snake Suicide";
				break;
			}
		}
	}

	displayGameOver() {
		this.ctx.font = "50px MV Boli";
		this.ctx.fillStyle = "rgba(28, 28, 28,0.5)";
		this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
		this.ctx.textAlign = "center";
		this.ctx.fillStyle = "white";
		this.ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);
		this.ctx.fillText(
			`${this.failure_message}`,
			this.gameWidth / 2,
			(this.gameHeight / 3) * 2
		);
		this.running = false;
	}

	resetGame() {
		this.score = 0;
		this.xVelocity = this.unitSize;
		this.yVelocity = 0;
		this.snake = [
			{ x: this.unitSize * 4, y: 0 },
			{ x: this.unitSize * 3, y: 0 },
			{ x: this.unitSize * 2, y: 0 },
			{ x: this.unitSize * 1, y: 0 },
			{ x: 0, y: 0 },
		];
		this.gameStart();
	}
}
