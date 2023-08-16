"use client";

import { BarChart, Color, Legend, Title } from "@tremor/react";

import { Spinner } from "@nextui-org/react";

import { GET_SUBJECT_AVERAGE_POINT } from "@/constants/api_endpoint";
import withQuery from "@/utils/withQuery";
import BaseChart from "@components/Chart/BaseChart";
import CriteriaSelector from "@components/CriteriaSelector";
import SemesterSelector from "@components/SemesterSelector/SemesterSelector";
import { SortSelector } from "@components/SortSelector";
import { ReactNode, useState } from "react";
import useSWR from "swr";

export default function ChartLayout({
	primaryTitle,
	secondaryTitle,
	handlerButtons,
	columnSize = 60,
	columnNum = 0,
	legends,
	colors,
}: {
	primaryTitle: string;
	secondaryTitle: string;
	handlerButtons: ReactNode;
	columnSize: number;
	columnNum: number;
	legends: string[];
	colors: Color[];
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
				<Legend
					className="ml-14 my-5 absolute bottom-2 left-0"
					categories={legends}
					colors={colors}
				/>
			</div>
		</BaseChart>
	);
}
