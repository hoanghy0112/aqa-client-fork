"use client";

import { Color, Legend } from "@tremor/react";

import BaseChart from "@components/chart/BaseChart";
import { Button } from "@nextui-org/react";
import { ReactNode, useMemo, useRef } from "react";
import Extensible from "../Extensible";
import DownloadIcon from "@assets/DownloadIcon";

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
				<div className=" relative w-full h-48 lg:h-32 px-8">
					<div className=" absolute w-full top-0 left-0 px-8 pt-5 flex flex-col lg:flex-row gap-5 justify-end items-start lg:items-center">
						<div className=" w-3/4 mt-2">
							<p>{primaryTitle}</p>
							<p className="w-full mt-2 font-normal text-sm">
								{secondaryTitle}
							</p>
						</div>
						<div className="w-fit flex flex-row gap-4 pr-5">
							{handlerButtons}
							<Button
								isIconOnly
								color="primary"
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
					className=" w-full overflow-x-auto overflow-y-hidden flex flex-col justify-stretch flex-grow"
				>
					<div
						id="chart"
						className=" pt-2 relative h-full pr-4 basis-full flex flex-col flex-grow"
						style={{ width }}
					>
						<Legend
							className="absolute left-8 top-0"
							categories={legends}
							colors={colors}
						/>
						{children}
					</div>
				</div>
			</Extensible>
		</BaseChart>
	);
}
