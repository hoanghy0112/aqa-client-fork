"use client";

import { Color, Legend, Title } from "@tremor/react";

import BaseChart from "@components/Chart/BaseChart";
import { ReactNode } from "react";

export default function ChartLayout({
	primaryTitle,
	secondaryTitle,
	columnSize = 60,
	columnNum = 0,
	legends,
	colors,
	handlerButtons,
	children,
}: {
	primaryTitle: string;
	secondaryTitle: string;
	columnSize?: number;
	columnNum?: number;
	legends: string[];
	colors: Color[];
	handlerButtons: ReactNode;
	children: ReactNode;
}) {
	return (
		<BaseChart>
			<div className=" relative w-full  px-8 py-5 mb-32 lg:mb-16">
				<div className=" absolute w-full top-0 left-0 px-8 py-5 flex flex-col lg:flex-row gap-5 justify-end items-start lg:items-center">
					<Title className=" mr-auto w-full">
						<p>{primaryTitle}</p>
						<div className="w-3/4 mt-2">
							<p className="w-full font-normal text-sm">
								{secondaryTitle}
							</p>
						</div>
					</Title>
					<div className="w-fit flex flex-row gap-4">{handlerButtons}</div>
				</div>
			</div>
			<div className="w-full h-fit overflow-x-auto pb-10">
				<div
					className="pr-4 h-fit"
					style={{
						width: columnNum > 0 ? columnNum * columnSize : "100%",
					}}
				>
					{children}
				</div>
				<Legend
					className="ml-14 my-5 absolute bottom-2 left-0"
					categories={legends}
					colors={colors}
				/>
			</div>
		</BaseChart>
	);
}
