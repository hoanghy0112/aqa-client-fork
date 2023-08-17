"use client";

import { Color, Legend, Title } from "@tremor/react";

import BaseChart from "@components/Chart/BaseChart";
import { ReactNode } from "react";
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
	return (
		<BaseChart>
			<Extensible>
				<div className=" relative w-full h-44 lg:h-24 px-8">
					<div className=" absolute w-full top-0 left-0 px-8 py-5 flex flex-col lg:flex-row gap-5 justify-end items-start lg:items-center">
						<Title className=" mr-auto w-full">
							<p>{primaryTitle}</p>
							<div className="w-3/4 mt-2">
								<p className="w-full font-normal text-sm">
									{secondaryTitle}
								</p>
							</div>
						</Title>
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
				<div className="w-full overflow-x-auto overflow-y-hidden flex flex-col justify-stretch flex-grow">
					<div
						className=" h-full pr-4 basis-full flex flex-col flex-grow"
						style={
							isFullWidth
								? { width: "100%" }
								: {
										width:
											columnNum > 0
												? columnNum * columnSize
												: "100%",
								  }
						}
					>
						{children}
					</div>
				</div>
			</Extensible>
		</BaseChart>
	);
}
