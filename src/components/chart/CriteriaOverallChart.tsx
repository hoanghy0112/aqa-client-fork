"use client";

import { Color } from "@tremor/react";

import { GET_CRITERIA_POINT_ACROSS_SEMESTER } from "@/constants/api_endpoint";
import { COLORS } from "@/constants/colors";
import useMultipleFetch from "@/hooks/useMultipleFetch";
import { chartMapper } from "@/utils/arrayManipulate";
import withQuery from "@/utils/withQuery";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

export default function CriteriaOverallChart() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const [criteria, setCriteria] = useState<Criteria | undefined>();
	const [subjects, setSubjects] = useState<Map<string, Subject>>(new Map());

	const { data: averageData, isLoading: isLoadingAverage } = useSWR<IChartData[]>(
		withQuery(GET_CRITERIA_POINT_ACROSS_SEMESTER, {
			criteria_id: criteria?.criteria_id,
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	const { data, isLoading } = useMultipleFetch<IChartData[]>(
		Array.from(subjects.entries()).map(([_, { subject_id }]) =>
			withQuery(GET_CRITERIA_POINT_ACROSS_SEMESTER, {
				criteria_id: criteria?.criteria_id,
				subject_id: subject_id,
			})
		)
	);

	const subjectNames = useMemo(
		() => [
			AVG_LEGEND,
			...Array.from(subjects.entries()).map(([_, sub]) => sub.subject_name),
		],
		[data, averageData]
	);

	const chartData = useMemo(
		() =>
			chartMapper(
				subjectNames,
				data,
				averageData || [],
				AVG_LEGEND,
				"display_name",
				(d: IChartData) => d.avg
			),
		[data, averageData, subjectNames]
	);

	const colors = useMemo(
		() =>
			[
				"sky",
				...Object.values(COLORS).slice(0, subjectNames.length - 1),
			] as Color[],
		[data, averageData]
	);

	return (
		<>
			{/* {isClient && (
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
							<SubjectSelector
								subjects={subjects}
								setSubjects={(d: any) => setSubjects(d)}
							/>
							<CriteriaSelector
								criteria={criteria}
								setCriteria={setCriteria}
							/>
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
			)} */}
		</>
	);
}

const dataFormatter = (number: number) => {
	// return "$ " + Intl.NumberFormat("us").format(number).toString();
	return `${Math.round(number * 100)}%`;
};

interface IChartData {
	display_name: string;
	semester_id: string;
	avg: number;
	type: string;
	year: string;
}

const AVG_LEGEND = "Điểm trung bình";
