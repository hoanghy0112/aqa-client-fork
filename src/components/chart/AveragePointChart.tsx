"use client";

import { BarChart } from "@components/chart/BarChart";

import { GET_SUBJECT_AVERAGE_POINT } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import withQuery from "@/utils/withQuery";
import CriteriaSelector from "@components/selectors/CriteriaSelector";
import SemesterSelector from "@components/selectors/SemesterSelector";
import { SortSelector } from "@components/selectors/SortSelector";
import useSWR from "swr";
import Loading from "../Loading";
import NoData from "../NoData";
import FacultySelector from "../selectors/FacultySelector";
import ProgramSelector from "../selectors/ProgramSelector";
import ChartLayout from "./ChartLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AveragePointChart() {
	const router = useRouter();

	const { semester, criteria, sort, faculty, program } = useFilter();

	const { data, isLoading } = useSWR<IChartData[]>(
		withQuery(GET_SUBJECT_AVERAGE_POINT, {
			semester_id: semester?.semester_id,
			criteria_id: criteria?.criteria_id,
			program,
			faculty_name: faculty?.faculty_name,
			sort,
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
					<>
						<SemesterSelector />
						<CriteriaSelector />
						<ProgramSelector />
						<FacultySelector />
						<SortSelector />
					</>
				}
			>
				<BarChart
					className=" h-full mt-4"
					data={
						data
							? [
									{
										label: LEGEND_NAME,
										data:
											data?.map((d) => ({
												x: d.display_name,
												y: d.average_point / d.max_point,
												id: d.subject_id,
											})) || [],
									},
							  ]
							: undefined
					}
					valueFormatter={dataFormatter}
					noDataText={isLoading ? <Loading /> : <NoData />}
					onClick={({ index, data }) =>
						router.push(`/subject/${data[0]?.id}`)
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
	average_point: number;
	display_name: string;
	max_point: number;
	subject_id: string;
}

const LEGEND_NAME = "Độ hài lòng";
