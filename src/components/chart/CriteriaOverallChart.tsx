"use client";

import { BarChart, Color } from "@tremor/react";

import {
	GET_CRITERIA_NAME,
	GET_CRITERIA_PER_SEMESTER,
	GET_CRITERIA_POINT_ACROSS_SEMESTER,
} from "@/constants/api_endpoint";
import { COLORS } from "@/constants/colors";
import useMultipleFetch from "@/hooks/useMultipleFetch";
import { chartMapper } from "@/utils/arrayManipulate";
import withQuery from "@/utils/withQuery";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import ChartLayout from "./ChartLayout";
import Loading from "../Loading";
import NoData from "../NoData";
import SemesterSelector from "../selectors/SemesterSelector";
import ProgramSelector from "../selectors/ProgramSelector";
import FacultySelector from "../selectors/FacultySelector";
import SubjectSelector from "../selectors/SubjectSelector";
import { SortSelector } from "../selectors/SortSelector";
import { useFilter } from "@/contexts/FilterContext";

export default function CriteriaOverallChart() {
	const { semester, sort, faculty, program } = useFilter();

	const { data: averageData, isLoading: isLoadingAverage } = useSWR<IChartData[]>(
		withQuery(GET_CRITERIA_PER_SEMESTER, {
			semester_id: semester?.semester_id,
			type: sort || "desc",
			faculty_name: faculty,
			program_name: program,
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	return (
		<ChartLayout
			primaryTitle="Biểu đồ tiêu chí qua các kỳ"
			secondaryTitle={"Tất cả các tiêu chí"}
			legends={[LEGEND]}
			colors={["sky"]}
			columnSize={150}
			columnNum={averageData?.length || 0}
			isFullWidth
			handlerButtons={
				<>
					<SemesterSelector />
					<ProgramSelector />
					<FacultySelector />
					<SubjectSelector />
					<SortSelector />
				</>
			}
		>
			<BarChart
				className=" h-full mt-4"
				data={
					averageData?.map((d) => ({
						...d,
						[LEGEND]: d.point,
						display_name: `Tiêu chí ${d.index}`,
					})) || []
				}
				index="display_name"
				categories={[LEGEND]}
				colors={["sky"]}
				yAxisWidth={80}
				autoMinValue
				valueFormatter={dataFormatter}
				showLegend={false}
				//@ts-ignore
				noDataText={isLoadingAverage ? <Loading /> : <NoData />}
			/>
		</ChartLayout>
	);
}

const dataFormatter = (number: number) => {
	// return "$ " + Intl.NumberFormat("us").format(number).toString();
	return `${Math.round(number * 100)}%`;
};

interface IChartData {
	display_name: string;
	criteria_id: string;
	point: number;
	index: number;
	num: number;
}

const LEGEND = "Tiêu chí";
