"use client";

import { Color, LineChart } from "@tremor/react";

import { GET_SUBJECT_POINT_ACROSS_SEMESTER } from "@/constants/api_endpoint";
import { COLORS } from "@/constants/colors";
import useMultipleFetch from "@/hooks/useMultipleFetch";
import { chartMapper } from "@/utils/arrayManipulate";
import withQuery from "@/utils/withQuery";
import CriteriaSelector from "@components/CriteriaSelector";
import { useMemo, useState } from "react";
import useSWR from "swr";
import Loading from "../Loading";
import NoData from "../NoData";
import SubjectSelector from "../SubjectSelector";
import ChartLayout from "./ChartLayout";
import ProgramSelector from "../ProgramSelector";
import FacultySelector from "../FacultySelector";

export default function SubjectPointAcrossSemesterChart() {
	const [criteria, setCriteria] = useState<Criteria | undefined>();
	const [subjects, setSubjects] = useState<Map<string, Subject>>(new Map());
	const [program, setProgram] = useState<string>("");
	const [faculty, setFaculty] = useState<string>("");

	const { data: averageData, isLoading: isLoadingAverage } = useSWR<
		IChartData[]
	>(
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
				faculty_name: faculty,
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
		[data, averageData]
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
						<SubjectSelector
							subjects={subjects}
							setSubjects={(d: any) => setSubjects(d)}
							faculty={faculty}
						/>
						<CriteriaSelector
							criteria={criteria}
							setCriteria={setCriteria}
						/>
						<ProgramSelector program={program} setProgram={setProgram} />
						<FacultySelector faculty={faculty} setFaculty={setFaculty} />
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
	// return "$ " + Intl.NumberFormat("us").format(number).toString();
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
