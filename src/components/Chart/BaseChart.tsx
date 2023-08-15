"use client";

import { ReactNode } from "react";

import GRID_IMAGE from "@assets/grid.svg";

export default function BaseChart({ children }: { children: ReactNode }) {
	return (
		<div className="w-full h-[400px]">
			<div className="absolute w-full h-full bg-[url(https://www.tremor.so/grid.svg)] opacity-20 bg-repeat">
				{children}
			</div>
			<div className="relative w-full h-full">{children}</div>
		</div>
	);
}
