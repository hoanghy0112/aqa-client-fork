"use client";

import BreadCrumb from "@/components/BreadCrumb";
import ChildrenItems from "@/components/ChildrenItems";
import { FilterProvider } from "@/contexts/FilterContext";
import { useAllSubjectsQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page({ params }: { params: any }) {
	const semester_id = params.id;
	const { query, setUrlQuery } = useFilterUrlQuery();

	const { data } = useAllSubjectsQuery({ variables: { filter: query } });

	return (
		<FilterProvider>
			<h1 className="font-semibold text-3xl text-slate-500">Khoa/Bộ môn</h1>
			<BreadCrumb />
			<ChildrenItems
				items={[
					{
						display_name: "Tất cả các môn học",
						value: "all",
						onClick() {
							setUrlQuery(`/subject`, {});
						},
					},
					...(data?.subjects.data.map(({ display_name, subject_id }) => ({
						display_name: display_name || "",
						value: subject_id,
						onClick() {
							setUrlQuery(`/subject/${subject_id}`, {
								subjects: [subject_id],
							});
						},
					})) || []),
				]}
			/>
		</FilterProvider>
	);
}
