"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { vimSnakeLogic } from "./utils/vimSnakeLogic.js";
import { PauseCircle, RotateCwIcon, Settings } from "lucide-react";

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const resetButtonRef = useRef<HTMLButtonElement>(null);
	const scoreTextRef = useRef(null);
	const hkey = useRef(null);
	const jkey = useRef(null);
	const kkey = useRef(null);
	const lkey = useRef(null);

	useEffect(() => {
		const ctx = canvasRef.current?.getContext("2d");
		const gameWidth = canvasRef.current?.width;
		const gameHeight = canvasRef.current?.height;

		const game = new vimSnakeLogic(
			ctx,
			gameWidth,
			gameHeight,
			scoreTextRef,
			hkey,
			jkey,
			kkey,
			lkey
		);
		game.gameStart();

		const handleKeyDown = (event: any) => {
			game.changeDirection(event);
		};
		window.addEventListener("keydown", handleKeyDown);

		const resetGame = (event: any) => {
			game.resetGame();
		};
		resetButtonRef.current?.addEventListener("click", resetGame);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<section id="game_screen" className="w-full h-screen flex items-start">
			<div className="left relative w-2/3 h-full pl-35 flex items-center gap-30 border-r border-neutral-400 p-5">
				<div className="sudden_info_container">
					<div className="score_container mb-16 flex flex-col items-center gap-2">
						<h1 className="text-6xl" ref={scoreTextRef}>
							0
						</h1>
						<span>score</span>
					</div>

					<div className="grid grid-cols-2 grid-rows-2 gap-0 auto-rows-auto auto-flow-row gap-4">
						<div className="flex flex-col items-center gap-2 text-xl">
							<h1>h </h1>
							<span ref={hkey}>0</span>
						</div>
						<div className="flex flex-col items-center gap-2 text-xl">
							<h1>j </h1>
							<span ref={jkey}>0</span>
						</div>
						<div className="flex flex-col items-center gap-2 text-xl">
							<h1>k </h1>
							<span ref={kkey}>0</span>
						</div>
						<div className="flex flex-col items-center gap-2 text-xl">
							<h1>l </h1>
							<span ref={lkey}>0</span>
						</div>
					</div>
				</div>
				<div className="canvas_container">
					<div className="sudden_icons mb-2 flex items-center justify-between">
						<div className="left flex items-center gap-2">
							<button ref={resetButtonRef}>
								<RotateCwIcon className="font-black" />
							</button>
							<PauseCircle />
						</div>
						<div className="right">
							<Settings />
						</div>
					</div>
					<canvas
						width={500}
						height={500}
						className="border-4 border-green-600 mb-5"
						ref={canvasRef}
					></canvas>
				</div>
				<Image
					src={"/vimsnakelogowobg.png"}
					alt="vim-snake-logo"
					width={200}
					height={100}
					className="-rotate-25 absolute -top-10 left-0"
				/>
			</div>
			<div className="right w-1/3 h-full p-5">
				<span>login to see</span>
			</div>
		</section>
	);
}
