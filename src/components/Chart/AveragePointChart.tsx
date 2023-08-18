"use client";

import { BarChart } from "@tremor/react";

import { Spinner } from "@nextui-org/react";

import { GET_SUBJECT_AVERAGE_POINT } from "@/constants/api_endpoint";
import withQuery from "@/utils/withQuery";
import CriteriaSelector from "@components/CriteriaSelector";
import SemesterSelector from "@components/SemesterSelector/SemesterSelector";
import { SortSelector } from "@components/SortSelector";
import { useState } from "react";
import useSWR from "swr";
import ChartLayout from "./ChartLayout";
import { FilterProvider } from "@/contexts/FilterContext";

export default function AveragePointChart() {
	const [semester, setSemester] = useState<Semester>();
	const [criteria, setCriteria] = useState<Criteria | undefined>();

	const [selectedKeys, setSelectedKeys] = useState(new Set(["desc"]));

	const { data, isLoading } = useSWR<IChartData[]>(
		withQuery(GET_SUBJECT_AVERAGE_POINT, {
			semester_id: semester?.semester_id,
			criteria_id: criteria?.criteria_id,
			sort: selectedKeys.has("asc") ? "asc" : "desc",
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	return (
		<>
			<ChartLayout
				primaryTitle="Biểu đồ điểm trung bình các môn học"
				secondaryTitle={criteria?.display_name || "Tất cả các tiêu chí"}
				legends={[LEGEND_NAME]}
				colors={["sky"]}
				columnNum={data?.length || 0}
				handlerButtons={
					<FilterProvider>
						<SemesterSelector
							semester={semester}
							setSemester={(d) => setSemester(d)}
						/>
						<CriteriaSelector
							criteria={criteria}
							setCriteria={setCriteria}
						/>
						<SortSelector
							selectedKeys={selectedKeys}
							setSelectedKeys={setSelectedKeys}
						></SortSelector>
					</FilterProvider>
				}
			>
				<BarChart
					className=" h-full mt-4"
					data={
						data?.map((d) => ({
							...d,
							[LEGEND_NAME]: d.average_point / d.max_point,
						})) || []
					}
					index="display_name"
					categories={[LEGEND_NAME]}
					colors={["sky"]}
					yAxisWidth={80}
					autoMinValue
					valueFormatter={dataFormatter}
					showLegend={false}
					//@ts-ignore
					noDataText={
						isLoading ? (
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

const dataFormatter = (number: number) => {
	// return "$ " + Intl.NumberFormat("us").format(number).toString();
	return `${Math.round(number * 100)}%`;
};

interface IChartData {
	average_point: number;
	display_name: string;
	max_point: number;
	subject_id: string;
}

const LEGEND_NAME = "Độ hài lòng";
