"use client";

import BreadCrumb from "@/components/BreadCrumb";
import ChildrenItems from "@/components/ChildrenItems";
import { FilterProvider } from "@/contexts/FilterContext";
import { useAllSubjectsQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function Page({ params }: { params: any }) {
	const { query, setUrlQuery } = useFilterUrlQuery();

	const [keyword, setKeyword] = useState("");
	const { data } = useAllSubjectsQuery({
		variables: { filter: { ...query, keyword } },
	});

	return (
		<FilterProvider>
			<h1 className="font-semibold text-3xl text-slate-500">Khoa/Bộ môn</h1>
			<BreadCrumb />
			<Input
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				onClear={() => setKeyword("")}
				isClearable
				type="text"
				size="md"
				placeholder="Nhập từ khóa cần tìm..."
				variant="bordered"
				className="mt-5 w-full"
			/>
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
