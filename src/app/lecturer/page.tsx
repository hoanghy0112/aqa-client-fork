"use client";

import { BarChart } from "@components/chart/BarChart";

import { GET_CRITERIA_PER_SEMESTER } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import withQuery from "@/utils/withQuery";
import useSWR from "swr";
import Loading from "@components/Loading";
import NoData from "@components/NoData";
import FacultySelector from "@components/selectors/FacultySelector";
import ProgramSelector from "@components/selectors/ProgramSelector";
import SemesterSelector from "@components/selectors/SemesterSelector";
import { SortSelector } from "@components/selectors/SortSelector";
import SubjectSelector from "@components/selectors/SubjectSelector";
import ChartLayout from "@components/chart/ChartLayout";

export default function CriteriaOverallChart() {
	const { semester, sort, faculty, program, subjects } = useFilter();

	const { data: averageData, isLoading: isLoadingAverage } = useSWR<IChartData[]>(
		withQuery(GET_CRITERIA_PER_SEMESTER, {
			semester_id: semester?.semester_id,
			subject_id: Array.from(subjects.values()).map((v) => v.subject_id),
			type: sort,
			faculty_name: faculty?.faculty_name,
			program: program,
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	return (
		<>
			<h1 className="font-semibold text-3xl">Tiêu chí</h1>
			<div className=" w-full mt-5 p-0 h-[420px]">
				<ChartLayout
					primaryTitle="Biểu đồ tiêu chí qua các kỳ"
					secondaryTitle={""}
					legends={[LEGEND]}
					colors={["sky"]}
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
							averageData
								? [
										{
											label: "Độ hài lòng",
											data:
												averageData?.map((d) => ({
													x: `Tiêu chí ${d.index}`,
													y: d.point * 100,
													tooltipTitle: d.display_name,
												})) || [],
										},
								  ]
								: undefined
						}
						valueFormatter={[dataFormatter]}
						noDataText={isLoadingAverage ? <Loading /> : <NoData />}
					/>
				</ChartLayout>
			</div>
		</>
	);
}

const dataFormatter = (number: number) => {
	return `${number.toFixed(2)}%`;
};

interface IChartData {
	display_name: string;
	criteria_id: string;
	point: number;
	index: number;
	num: number;
}

const LEGEND = "Độ hài lòng";
