"use client";

import { Card, Title, AreaChart, BarChart } from "@tremor/react";

import BaseChart from "./BaseChart";
import SemesterSelector from "../SemesterSelector/SemesterSelector";
import { useState } from "react";
import SemesterContext from "@/contexts/SemesterContext";

export default function AveragePointChart() {
	const [semester, setSemester] = useState<Semester | undefined>();

	return (
		<BaseChart>
			<Card>
				<SemesterContext.Provider
					value={{ semester, setSemester: (data) => setSemester(data) }}
				>
					<SemesterSelector />
				</SemesterContext.Provider>
				<BarChart
					className=" h-72 mt-4"
					data={chartdata}
					index="date"
					categories={["SemiAnalysis", "The Pragmatic Engineer"]}
					colors={["sky", "green"]}
					valueFormatter={dataFormatter}
				/>
			</Card>
		</BaseChart>
	);
}

const dataFormatter = (number: number) => {
	return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const chartdata = [
	{
		date: "Jan 22",
		SemiAnalysis: 2890,
		"The Pragmatic Engineer": 2338,
	},
	{
		date: "Feb 22",
		SemiAnalysis: 2756,
		"The Pragmatic Engineer": 2103,
	},
	{
		date: "Mar 22",
		SemiAnalysis: 3322,
		"The Pragmatic Engineer": 2194,
	},
	{
		date: "Apr 22",
		SemiAnalysis: 3470,
		"The Pragmatic Engineer": 2108,
	},
	{
		date: "May 22",
		SemiAnalysis: 3475,
		"The Pragmatic Engineer": 1812,
	},
	{
		date: "Jun 22",
		SemiAnalysis: 3129,
		"The Pragmatic Engineer": 1726,
	},
];
