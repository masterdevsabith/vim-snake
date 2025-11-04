"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const scoreTextRef = useRef<HTMLDivElement>(null);

	return (
		<section id="game_screen" className="w-full h-screen flex items-start">
			<div className="left relative w-2/3 h-full pl-35 flex items-center gap-30 border-r border-neutral-400 p-5">
				<div className="sudden_info_container">
					<div className="flex flex-col items-center gap-2">
						<h1 className="text-6xl">0</h1>
						<span>score</span>
					</div>

					<div className="flex items-center gap-6">
						<div className="flex flex-col items-center gap-2">h</div>
						<div className="flex flex-col items-center gap-2">j</div>
						<div className="flex flex-col items-center gap-2">k</div>
						<div className="flex flex-col items-center gap-2">l</div>
					</div>
				</div>
				<canvas
					width={500}
					height={500}
					className="border-4 border-green-600 mb-5"
				></canvas>
				<Image
					src={"/vimsnakelogowobg.png"}
					alt="vim-snake-logo"
					width={250}
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
