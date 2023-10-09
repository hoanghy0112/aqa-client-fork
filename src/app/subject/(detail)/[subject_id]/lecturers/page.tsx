"use client";

import { BarChart } from "@components/chart/BarChart";

import CriteriaPointTable from "@/components/CriteriaPointTable";
import TableSketon from "@/components/TableSkeleton";
import { CriteriaSelectorWithSearchParam } from "@/components/selectors/CriteriaSelector";
import { GET_CLASSES, GET_SUBJECT_LECTURER_POINT } from "@/constants/api_endpoint";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import withQuery from "@/utils/withQuery";
import Loading from "@components/Loading";
import NoData from "@components/NoData";
import ChartLayout from "@components/chart/ChartLayout";
import { ProgramSelectorWithSearchParam } from "@components/selectors/ProgramSelector";
import { SemesterSelectorWithSearchParam } from "@components/selectors/SemesterSelector";
import { SortSelector } from "@/components/selectors/SortSelector";
import { SortDescriptor } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { COLORS } from "@/constants/colors";
import { Color } from "@tremor/react";

function Page_({ subject_id }: { subject_id: string }) {
	const router = useRouter();

	const searchParams = useSearchParams();
	const { sort } = useFilter();

	const { data: chartData, isLoading } = useSWR<IChartData>(
		withQuery(GET_SUBJECT_LECTURER_POINT, {
			subject_id,
			semester_id: searchParams.get("semester"),
			program: searchParams.get("program"),
			criteria_id: searchParams.get("criteria"),
			sort,
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	return (
		<>
			<ChartLayout
				primaryTitle="Biểu đồ điểm trung bình các giảng viên"
				legends={LEGEND_NAMES}
				colors={CHART_COLORS}
				columnNum={chartData?.length || 0}
				height={450}
				showLegend
				handlerButtons={
					<>
						<SemesterSelectorWithSearchParam />
						<CriteriaSelectorWithSearchParam />
						<ProgramSelectorWithSearchParam />
						<SortSelector />
					</>
				}
			>
				<BarChart
					className=" h-full mt-4"
					data={
						chartData && chartData?.length
							? [
									{
										label: LEGEND_NAMES[0],
										data:
											chartData?.map((d) => ({
												x: d.lecturer_name,
												y: d.point * 100,
												id: d.lecturer_id,
											})) || [],
									},
									{
										label: LEGEND_NAMES[1],
										data:
											chartData?.map((d) => ({
												x: d.lecturer_name,
												y: d.class_num,
												id: d.lecturer_id,
											})) || [],
										yAxisID: "y1",
										backgroundColor: "rgba(255, 99, 132, 0.7)",
									},
							  ]
							: undefined
					}
					valueFormatter={[dataFormatter, (d: any) => d]}
					noDataText={isLoading ? <Loading /> : <NoData />}
					onClick={({ index, data }) =>
						router.push(`/lecturer/${data[0]?.id}`)
					}
				/>
			</ChartLayout>
		</>
	);
}

export default function Page({
	params: { subject_id },
}: {
	params: { subject_id: string };
}) {
	return (
		<FilterProvider>
			<Page_ subject_id={subject_id} />
		</FilterProvider>
	);
}

const dataFormatter = (number: number) => {
	return `${Math.round(number)}%`;
};

type IChartData = {
	lecturer_name: string;
	lecturer_id: string;
	point: number;
	max_point: number;
	class_num: number;
}[];

const LEGEND_NAME = "Độ hài lòng";

const defaultColumns: {
	key: string;
	label: string;
	index?: number;
	width?: number;
}[] = [
	{
		key: "lecturer_name",
		label: "Tên giảng viên",
		width: 300,
	},
];

const CHART_COLORS = ["sky", "pink"] as Color[];
const LEGEND_NAMES = ["Độ hài lòng", "Số lớp đã dạy"];
