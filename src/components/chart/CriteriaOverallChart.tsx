"use client";

import { BarChart } from "@components/chart/BarChart";

import { GET_CRITERIA_PER_SEMESTER } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import withQuery from "@/utils/withQuery";
import useSWR from "swr";
import Loading from "../Loading";
import NoData from "../NoData";
import FacultySelector from "../selectors/FacultySelector";
import ProgramSelector from "../selectors/ProgramSelector";
import SemesterSelector from "../selectors/SemesterSelector";
import { SortSelector } from "../selectors/SortSelector";
import SubjectSelector from "../selectors/SubjectSelector";
import ChartLayout from "./ChartLayout";

export default function CriteriaOverallChart() {
	const { semester, sort, faculty, program } = useFilter();

	const { data: averageData, isLoading: isLoadingAverage } = useSWR<IChartData[]>(
		withQuery(GET_CRITERIA_PER_SEMESTER, {
			semester_id: semester?.semester_id,
			type: sort,
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
					<SortSelector defaultValue="" />
				</>
			}
		>
			<BarChart
				className=" h-full mt-4"
				data={
					averageData
						? [
								{
									label: "Độ hài lòng",
									data:
										averageData?.map((d) => ({
											x: `Tiêu chí ${d.index}`,
											y: d.point,
										})) || [],
								},
						  ]
						: undefined
				}
				valueFormatter={dataFormatter}
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
