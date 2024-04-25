"use client";

import ChildrenItems from "@/components/ChildrenItems";
import { useDetailCriteriaQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page({
	params: { criteria_id },
}: {
	params: {
		criteria_id: string;
	};
}) {
	const { setUrlQuery } = useFilterUrlQuery();

	const { data } = useDetailCriteriaQuery({ variables: { id: criteria_id } });

	return (
		<div>
			<ChildrenItems
				items={
					data?.criteria?.semester.map(
						({ display_name, semester_id }) => ({
							display_name,
							value: semester_id,
							onClick() {
								setUrlQuery(`/semester/${semester_id}`, {
									semester_id,
								});
							},
						})
					) || []
				}
			/>
		</div>
	);
}
