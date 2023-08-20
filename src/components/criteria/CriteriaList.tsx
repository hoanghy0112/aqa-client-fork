import { GET_CRITERIA_NAME } from "@/constants/api_endpoint";
import React from "react";
import useSWR from "swr";
import SpecificCriteriaChart from "../chart/SpecificCriteriaChart";

const CriteriaList = () => {
	const { data: criterias, isLoading } = useSWR<Criteria[]>(
		GET_CRITERIA_NAME,
		(url: string) => fetch(url).then((r) => r.json())
	);
	return (
		<>
			{criterias?.map((criteria) => (
				<SpecificCriteriaChart
					criteria={criteria}
					key={criteria.criteria_id}
				/>
			))}
		</>
	);
};

export default CriteriaList;
