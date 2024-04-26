"use client";

import ChildrenItems from "@/components/ChildrenItems";
import { FilterProvider } from "@/contexts/FilterContext";
import { useAllLecturersQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page({ params }: { params: any }) {
	const { query, setUrlQuery } = useFilterUrlQuery();

	const { data } = useAllLecturersQuery({ variables: { filter: query } });

	return (
		<FilterProvider>
			<ChildrenItems
				items={[
					{
						display_name: "Tất cả các môn học",
						value: "all",
						onClick() {
							setUrlQuery(`/subject`, {});
						},
					},
					...(data?.lecturers.data.map(
						({ display_name, lecturer_id }) => ({
							display_name: display_name || "",
							value: lecturer_id,
							onClick() {
								setUrlQuery(`/lecturer/${lecturer_id}`, {
									lecturer_id
								});
							},
						})
					) || []),
				]}
			/>
		</FilterProvider>
	);
}
