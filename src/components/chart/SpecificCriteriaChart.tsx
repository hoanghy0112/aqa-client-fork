import { GET_CRITERIA_POINT_ACROSS_SEMESTER } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import { defaultFetcher } from "@/utils/fetchers";
import withQuery from "@/utils/withQuery";
import { LineChart } from "@tremor/react";
import useSWR from "swr";
import Loading from "../Loading";
import NoData from "../NoData";
import FacultySelector from "../selectors/FacultySelector";
import ProgramSelector from "../selectors/ProgramSelector";
import SubjectSelector from "../selectors/SubjectSelector";
import ChartLayout from "./ChartLayout";
import { useEffect, useRef, useState } from "react";

export default function SpecificCriteriaChart({ criteria }: { criteria: Criteria }) {
	const { faculty, program } = useFilter();
	const containerRef = useRef<HTMLDivElement>(null);
	const [data, setData] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const containerElement = containerRef.current;
		if (!containerElement) return;

		const observer = new IntersectionObserver(async ([entry]) => {
			if (entry.isIntersecting) {
				if (data.length == 0) setIsLoading(true);
				const res = await fetch(
					withQuery(GET_CRITERIA_POINT_ACROSS_SEMESTER, {
						criteria_id: criteria.criteria_id,
						faculty_id: faculty?.faculty_id,
					})
				);
				const jsonData = await res.json();
				setData(jsonData);
				setIsLoading(false);
			}
		});

		observer.observe(containerElement);

		return () => {
			if (containerElement) observer.unobserve(containerElement);
		};
	}, [criteria.criteria_id, faculty?.faculty_id, program, data.length]);

	useEffect(() => {
		setData([]);
		setIsLoading(true);
	}, [criteria.criteria_id, faculty?.faculty_id, program]);

	return (
		<div ref={containerRef} className="mt-10">
			<h1 className="font-semibold text-xl">Tiêu chí {criteria.index}</h1>
			<p className="mb-6">{criteria.display_name}</p>
			<ChartLayout
				primaryTitle={criteria.display_name}
				secondaryTitle=""
				height={350}
				legends={[LEGEND_NAME]}
				colors={["sky"]}
				columnNum={data?.length || 0}
				showLegend={true}
				handlerButtons={
					<>
						<ProgramSelector />
						<FacultySelector />
						<SubjectSelector />
					</>
				}
			>
				<LineChart
					className=" h-full mt-4"
					data={
						isLoading
							? []
							: data?.map((d: any) => ({
									...d,
									[LEGEND_NAME]: d.avg * 100,
							  })) || []
					}
					index="display_name"
					categories={[LEGEND_NAME]}
					colors={["sky"]}
					yAxisWidth={80}
					autoMinValue
					valueFormatter={(d: number) => `${d.toFixed(2)}%`}
					showLegend={true}
					//@ts-ignore
					noDataText={isLoading ? <Loading /> : <NoData />}
				/>
			</ChartLayout>
		</div>
	);
}

const LEGEND_NAME = "Độ hài lòng";
