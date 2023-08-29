"use client";

import { BarChart } from "@components/chart/BarChart";

import { GET_CLASSES, GET_SUBJECT_AVERAGE_POINT } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import withQuery from "@/utils/withQuery";
import CriteriaSelector from "@components/selectors/CriteriaSelector";
import SemesterSelector, {
	SemesterSelectorWithSearchParam,
} from "@components/selectors/SemesterSelector";
import { SortSelector } from "@components/selectors/SortSelector";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Loading from "@components/Loading";
import NoData from "@components/NoData";
import FacultySelector from "@components/selectors/FacultySelector";
import ProgramSelector, {
	ProgramSelectorWithSearchParam,
} from "@components/selectors/ProgramSelector";
import ChartLayout from "@components/chart/ChartLayout";

export default function Page({
	params: { subject_id },
}: {
	params: { subject_id: string };
}) {
	const router = useRouter();

	const searchParams = useSearchParams();
	// const { semester, criteria, sort, faculty, program } = useFilter();

	const { data, isLoading } = useSWR<IChartData>(
		withQuery(GET_CLASSES, {
			subject_id,
			semester_id: searchParams.get("semester"),
			program: searchParams.get("program"),
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	console.log(data?.data);

	return (
		<ChartLayout
			primaryTitle="Biểu đồ điểm trung bình các lớp"
			legends={[LEGEND_NAME]}
			colors={["sky"]}
			columnNum={data?.data?.length || 0}
			height={450}
			handlerButtons={
				<>
					<SemesterSelectorWithSearchParam />
					{/* <CriteriaSelector /> */}
					<ProgramSelectorWithSearchParam />
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
										data?.data?.map((d) => ({
											x: d.class_name,
											y: d.points[0].point,
											id: d.class_id,
										})) || [],
								},
						  ]
						: undefined
				}
				valueFormatter={dataFormatter}
				noDataText={isLoading ? <Loading /> : <NoData />}
				onClick={({ index, data }) => router.push(`/subject/${data[0]?.id}`)}
			/>
		</ChartLayout>
	);
}

const dataFormatter = (number: number) => {
	return `${Math.round(number * 100)}%`;
};

interface IChartData {
	data: {
		class_name: string;
		class_id: string;
		points: {
			criteria_id: string;
			criteria_name: string;
			index: number;
			point: number;
		}[];
	}[];
}

const LEGEND_NAME = "Độ hài lòng";
