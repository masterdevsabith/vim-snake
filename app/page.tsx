"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { vimSnakeLogic } from "./utils/vimSnakeLogic.js";
import {
	Github,
	PauseCircle,
	RotateCwIcon,
	Settings,
	Star,
	Twitter,
} from "lucide-react";
import Link from "next/link.js";

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const resetButtonRef = useRef<HTMLButtonElement>(null);
	const pauseButtonRef = useRef<HTMLButtonElement>(null);
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

		const pauseGame = () => {
			game.pauseGame();
		};
		pauseButtonRef.current?.addEventListener("click", pauseGame);

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
							<button ref={pauseButtonRef}>
								<PauseCircle />
							</button>
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
			<div className="right flex flex-col items-center justify-center w-1/3 h-full p-5">
				<span className="text-gray-300 mb-12">leaderboard coming soon...</span>

				<div className="socials flex flex-col items-center gap-2 mb-12">
					<h4 className="text-3xl font-bold">Follow The Creator:</h4>
					<div className="socials flex items-center gap-2">
						<Link href={"https://x.com/masterdevsabith"}>
							<Twitter />
						</Link>
						<Link href={"https://github.com/masterdevsabith"}>
							<Github />
						</Link>
					</div>
				</div>

				<div className="promotions">
					<Link href={"https://github.com/masterdevsabith/vim-snake"}>
						<button className="bg-yellow-400 rounded-md px-2 py-5 flex items-center justify-center text-black font-bold">
							Give a <Star className="mx-2" /> on Github
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
