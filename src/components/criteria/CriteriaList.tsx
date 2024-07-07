"use client";

import { useAllCriteriasQuery } from "@/gql/graphql";
import SpecificCriteriaChart from "../chart/SpecificCriteriaChart";

const CriteriaList = () => {
	const { data: criterias } = useAllCriteriasQuery();

	return (
		<>
			{criterias?.criterias.data.map((criteria, index) => (
				<SpecificCriteriaChart
					criteria={{ ...criteria, index: index + 1 }}
					key={criteria.criteria_id}
				/>
			))}
		</>
	);
};

export default CriteriaList;
