import { AreaChart } from "@tremor/react";
import ChartLayout from "./ChartLayout";
import SemesterSelector from "../selectors/SemesterSelector";
import ProgramSelector from "../selectors/ProgramSelector";
import FacultySelector from "../selectors/FacultySelector";
import { SortSelector } from "../selectors/SortSelector";
import { useState } from "react";
import useSWR from "swr";
import withQuery from "@/utils/withQuery";
import {
	GET_CRITERIA_NAME,
	GET_CRITERIA_PER_SEMESTER,
} from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";

export default function SpecificCriteriaChart({ criteria }: { criteria: Criteria }) {
	const { sort } = useFilter();
	const { data } = useSWR(
		withQuery(GET_CRITERIA_PER_SEMESTER, {
			type: sort || "asc",
		})
	);
	return (
		<div>
			<h1 className="font-semibold text-3xl">Tiêu chí {criteria?.index}</h1>
			<ChartLayout
				primaryTitle={`Biểu đồ tiêu chí ${criteria?.display_name}`}
				secondaryTitle={`Tiêu chí ${criteria?.index}`}
				legends={[LEGEND_NAME]}
				colors={["sky"]}
				columnNum={data?.length || 0}
				handlerButtons={
					<>
						<SemesterSelector />
						<ProgramSelector />
						<FacultySelector />
						<SortSelector />
					</>
				}
			>
				{/* <AreaChart /> */}
			</ChartLayout>
		</div>
	);
}

const LEGEND_NAME = "";
