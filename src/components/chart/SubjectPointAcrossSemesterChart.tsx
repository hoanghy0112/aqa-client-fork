"use client";

import { Color, LineChart } from "@tremor/react";

import { GET_SUBJECT_POINT_ACROSS_SEMESTER } from "@/constants/api_endpoint";
import { COLORS } from "@/constants/colors";
import { useFilter } from "@/contexts/FilterContext";
import useMultipleFetch from "@/hooks/useMultipleFetch";
import { chartMapper } from "@/utils/arrayManipulate";
import withQuery from "@/utils/withQuery";
import CriteriaSelector from "@components/selectors/CriteriaSelector";
import { useMemo } from "react";
import useSWR from "swr";
import FacultySelector from "../selectors/FacultySelector";
import Loading from "../Loading";
import NoData from "../NoData";
import ProgramSelector from "../selectors/ProgramSelector";
import SubjectSelector from "../selectors/SubjectSelector";
import ChartLayout from "./ChartLayout";

export default function SubjectPointAcrossSemesterChart() {
	const { criteria, subjects, program, faculty } = useFilter();

	const { data: averageData, isLoading: isLoadingAverage } = useSWR<IChartData[]>(
		withQuery(GET_SUBJECT_POINT_ACROSS_SEMESTER, {
			criteria_id: criteria?.criteria_id,
			program,
			faculty_name: faculty,
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	const { data, isLoading } = useMultipleFetch<IChartData[]>(
		Array.from(subjects.entries()).map(([_, { subject_id }]) =>
			withQuery(GET_SUBJECT_POINT_ACROSS_SEMESTER, {
				criteria_id: criteria?.criteria_id,
				subject_id: subject_id,
				program,
				faculty_name: faculty?.faculty_name,
			})
		)
	);

	const subjectNames = useMemo(
		() => [
			AVG_LEGEND,
			...Array.from(subjects.entries()).map(([_, sub]) => sub.subject_name),
		],
		[subjects]
	);

	const chartData = useMemo(
		() =>
			chartMapper(
				subjectNames,
				data,
				averageData || [],
				AVG_LEGEND,
				"semester_name",
				(d: IChartData) => d.point / d.max_point
			),
		[data, averageData, subjectNames]
	);

	const colors = useMemo(
		() =>
			[
				"sky",
				...Object.values(COLORS).slice(0, subjectNames.length - 1),
			] as Color[],
		[subjectNames.length]
	);

	return (
		<>
			<ChartLayout
				primaryTitle="Biểu đồ điểm trung bình các môn học qua các kỳ"
				secondaryTitle={criteria?.display_name || "Tất cả các tiêu chí"}
				legends={subjectNames}
				colors={colors}
				columnSize={150}
				columnNum={data?.length || 0}
				isFullWidth
				handlerButtons={
					<>
						<SubjectSelector />
						<CriteriaSelector />
						<ProgramSelector />
						<FacultySelector />
					</>
				}
			>
				<LineChart
					className=" h-full mt-4"
					data={chartData}
					index="semester_name"
					categories={subjectNames}
					colors={colors}
					yAxisWidth={80}
					autoMinValue
					valueFormatter={dataFormatter}
					showLegend={false}
					//@ts-ignore
					noDataText={
						isLoading && isLoadingAverage ? <Loading /> : <NoData />
					}
				/>
			</ChartLayout>
		</>
	);
}

const dataFormatter = (number: number) => {
	return `${Math.round(number * 100)}%`;
};

interface IChartData {
	point: number;
	max_point: number;
	semester_name: string;
	semester_id: string;
	type: string;
	year: string;
}

const AVG_LEGEND = "Điểm trung bình";
