"use client";

import { Color, Legend } from "@tremor/react";

import DownloadIcon from "@assets/DownloadIcon";
import BaseChart from "@components/chart/BaseChart";
import { Button } from "@nextui-org/button";
import { ReactNode, useMemo, useRef } from "react";
import Extensible from "../Extensible";

//@ts-ignore
import domtoimage from "dom-to-image";

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
	height,
	showLegend = false,
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
	height?: number;
	showLegend?: boolean;
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
	}, [columnNum, columnSize, isFullWidth, containerRef]);

	return (
		<BaseChart height={height}>
			<Extensible>
				<div className="w-full px-8">
					<div className="  w-full mb-6 pl-2 pr-8 pt-5 flex flex-col xl:flex-row gap-5 justify-end items-start xl:items-center">
						<div className=" w-3/4 mt-2">
							<p>{primaryTitle}</p>
							<p className="w-full mt-2 font-normal text-sm">
								{secondaryTitle}
							</p>
						</div>
						<div className="w-full xl:w-fit flex flex-row flex-wrap xl:flex-nowrap gap-4 pr-5">
							{handlerButtons}
							<Button
								isIconOnly
								color="primary"
								className="w-fit"
								onPress={() => {
									domtoimage
										.toJpeg(document.getElementById("chart"), {
											quality: 0.95,
											bgcolor: "white",
										})
										.then(function (dataUrl: string) {
											var link = document.createElement("a");
											link.download = "chart.jpeg";
											link.href = dataUrl;
											link.click();
										});
								}}
							>
								<DownloadIcon color="white" />
							</Button>
						</div>
					</div>
				</div>
				<div
					ref={containerRef}
					id="chart"
					className=" relative h-full w-full overflow-x-auto overflow-y-hidden flex flex-col justify-stretch flex-grow"
				>
					{showLegend ? (
						<Legend
							className=" w-full px-10"
							categories={legends}
							colors={colors}
						/>
					) : null}
					<div className=" relative pb-5 h-full w-full overflow-x-auto overflow-y-hidden flex flex-col justify-stretch flex-grow">
						<div
							className=" pt-2 h-full pr-4 basis-full flex flex-col flex-grow"
							style={{ width }}
						>
							{children}
						</div>
					</div>
				</div>
			</Extensible>
		</BaseChart>
	);
}
