"use client";

import { Color, Legend } from "@tremor/react";

import BaseChart from "@components/chart/BaseChart";
import { ReactNode, useMemo, useRef } from "react";
import Extensible from "../Extensible";

export default function ChartLayout({
	primaryTitle,
	secondaryTitle,
	columnSize = 60,
	columnNum = 0,
	legends,
	colors,
	handlerButtons,
	children,
	isFullWidth = false,
}: {
	primaryTitle: string;
	secondaryTitle: string;
	columnSize?: number;
	columnNum?: number;
	legends: string[];
	colors: Color[];
	handlerButtons: ReactNode;
	children: ReactNode;
	isFullWidth?: boolean;
}) {
	const containerRef = useRef<HTMLDivElement>(null);

	const width: string | number = useMemo(() => {
		if (isFullWidth) return "100%";
		if (containerRef?.current && columnNum > 0) {
			return Math.max(
				columnNum * columnSize,
				containerRef.current.getBoundingClientRect().width
			);
		} else if (columnNum > 0) {
			return columnNum * columnSize;
		}
		return "100%";
	}, [columnNum, columnSize, isFullWidth]);

	return (
		<BaseChart>
			<Extensible>
				<div className=" relative w-full h-48 lg:h-28 px-8">
					<div className=" absolute w-full top-0 left-0 px-8 pt-5 flex flex-col lg:flex-row gap-5 justify-end items-start lg:items-center">
						<div className=" w-3/4 mt-2">
							<p>{primaryTitle}</p>
							<p className="w-full mt-2 font-normal text-sm">
								{secondaryTitle}
							</p>
						</div>
						<div className="w-fit flex flex-row gap-4 pr-5">
							{handlerButtons}
						</div>
					</div>
				</div>
				<Legend
					className="ml-14 mr-8"
					categories={legends}
					colors={colors}
				/>
				<div
					ref={containerRef}
					className="w-full overflow-x-auto overflow-y-hidden flex flex-col justify-stretch flex-grow"
				>
					<div
						className=" h-full pr-4 basis-full flex flex-col flex-grow"
						style={{ width }}
					>
						{children}
					</div>
				</div>
			</Extensible>
		</BaseChart>
	);
}
