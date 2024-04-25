"use client";

import BreadCrumb from "@/components/BreadCrumb";
import ChildrenItems from "@/components/ChildrenItems";
import { FilterProvider } from "@/contexts/FilterContext";
import { useFacultiesQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { ReactNode } from "react";

export default function Page({ params }: { params: any }) {
	const semester_id = params.id;
	const { query, setUrlQuery } = useFilterUrlQuery();

	const { data } = useFacultiesQuery();

	return (
		<FilterProvider>
			<h1 className="font-semibold text-3xl text-slate-500">Học kỳ</h1>
			<BreadCrumb />
			<ChildrenItems
				items={[
					{
						display_name: "Tất cả các khoa/bộ môn",
						value: "all",
						onClick() {
							setUrlQuery(`/faculty`, {});
						},
					},
					...(data?.faculties.data.map(({ display_name, faculty_id }) => ({
						display_name,
						value: faculty_id,
						onClick() {
							setUrlQuery(`/falculty/${faculty_id}`, {
								faculty_id,
							});
						},
					})) || []),
				]}
			/>
		</FilterProvider>
	);
}
