"use client";

import { useAllCriteriasQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import SpecificCriteriaChart from "../chart/SpecificCriteriaChart";
import { useEffect } from "react";

const CriteriaList = () => {
	const { query, setUrlQuery } = useFilterUrlQuery();
	const { data: criterias, refetch } = useAllCriteriasQuery({
		variables: { filter: { ...query } },
	});

	return (
		<>
			{criterias?.criterias.data
				.filter((v) => {
					let maxType: any = null;
					v.type.forEach((d) => {
						if (!maxType) maxType = d;
						else if (maxType.num < d.num) maxType = d;
					});
					if (query.class_type === "" || query.class_type === "All")
						return true;
					return maxType.class_type === query.class_type;
				})
				.map((criteria, index) => (
					<SpecificCriteriaChart
						criteria={{ ...criteria, index: index + 1 }}
						key={`${criteria.criteria_id}`}
					/>
				))}
		</>
	);
};

export default CriteriaList;
