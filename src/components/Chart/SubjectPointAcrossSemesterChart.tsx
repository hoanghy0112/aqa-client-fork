"use client";

import { Color, LineChart } from "@tremor/react";

import { Spinner } from "@nextui-org/react";

import { GET_SUBJECT_POINT_ACROSS_SEMESTER } from "@/constants/api_endpoint";
import useMultipleFetch from "@/hooks/useMultipleFetch";
import { shuffle } from "@/utils/arrayManipulate";
import withQuery from "@/utils/withQuery";
import CriteriaSelector from "@components/CriteriaSelector";
import { useMemo, useState } from "react";
import useSWR from "swr";
import SubjectSelector from "../SubjectSelector";
import ChartLayout from "./ChartLayout";

export default function SubjectPointAcrossSemesterChart() {
	const [criteria, setCriteria] = useState<Criteria | undefined>();
	const [subjects, setSubjects] = useState<Map<string, Subject>>(new Map());

	const { data: averageData, isLoading: isLoadingAverage } = useSWR<
		IChartData[]
	>(
		withQuery(GET_SUBJECT_POINT_ACROSS_SEMESTER, {
			criteria_id: criteria?.criteria_id,
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	const { data, isLoading } = useMultipleFetch<IChartData[]>(
		Array.from(subjects.entries()).map(([_, { subject_id }]) =>
			withQuery(GET_SUBJECT_POINT_ACROSS_SEMESTER, {
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

	const chartData = useMemo(() => {
		const subjectNames = Array.from(subjects.entries()).map(
			([_, sub]) => sub.subject_name
		);

		const items = new Map();
		if (averageData) {
			averageData.forEach((d) =>
				items.set(d.semester_name, {
					[AVG_LEGEND]: d.point / d.max_point,
					...d,
				})
			);
		}
		data.forEach((d, i) => {
			d.forEach((v, j) => {
				items.set(v.semester_name, {
					...v,
					...(items.get(v.semester_name) || {}),
					[subjectNames[i]]: v.point / v.max_point,
				});
			});
		});

		const semesterConverter = ({ type, year }: IChartData) =>
			`${year}, ${type}`;

		return Array.from(items.entries())
			.map(([_, v]) => v)
			.sort((a, b) =>
				semesterConverter(a) > semesterConverter(b) ? 1 : -1
			);
	}, [data, averageData]);

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
						isLoading && isLoadingAverage ? (
							<div className=" flex flex-row items-center gap-4">
								<Spinner size="sm" />
								<p className=" text-medium font-medium">Đang tải</p>
							</div>
						) : (
							<p className=" text-medium font-medium">
								Không có dữ liệu
							</p>
						)
					}
				/>
			</ChartLayout>
		</>
	);
}

const COLORS = shuffle([
	"indigo",
	"lime",
	"red",
	"teal",
	"violet",
	"yellow",
	"slate",
	"cyan",
	"fuchsia",
	"gray",
	"green",
	"orange",
	"pink",
	"purple",
	"zinc",
	"neutral",
	"stone",
	"amber",
	"emerald",
	"sky",
	"rose",
]);

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
