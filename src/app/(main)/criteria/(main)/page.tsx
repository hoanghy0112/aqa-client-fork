"use client";

import ChildrenItems from "@/components/ChildrenItems";
import { useAllCriteriasQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
	const { query, setUrlQuery } = useFilterUrlQuery();

	const [keyword, setKeyword] = useState("");

	const { data, loading } = useAllCriteriasQuery({
		variables: { filter: { ...query, keyword } },
	});

	return (
		<div>
			<Input
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				onClear={() => setKeyword("")}
				isClearable
				type="text"
				size="md"
				placeholder="Nhập từ khóa cần tìm..."
				variant="bordered"
				className=" mt-4 w-full"
			/>
			<ChildrenItems
				loading={loading}
				items={[
					{
						display_name: "Chọn tất cả tiêu chí",
						value: "all",
						onClick() {
							setUrlQuery(`/semester`, {
								criteria_id: "",
							});
						},
					},
					...(data?.criterias.data
						.filter((v) => {
							if (
								query.class_type === "TH2" &&
								v.type.some((d) => d.class_type === "TH2")
							)
								return true;
							let maxType: any = null;
							v.type.forEach((d) => {
								if (!maxType) maxType = d;
								else if (maxType.num < d.num) maxType = d;
							});
							if (
								query.class_type === "" ||
								query.class_type === "All"
							)
								return true;
							return maxType.class_type === query.class_type;
						})
						.map(({ display_name, criteria_id }, index) => ({
							display_name: `${display_name}`,
							value: criteria_id,
							onClick() {
								setUrlQuery(`/criteria/${criteria_id}`, {
									criteria_id,
								});
							},
						})) || []),
				]}
			/>
		</div>
	);
}
