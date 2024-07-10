"use client";

import ChildrenItems from "@/components/ChildrenItems";
import { useAllCriteriasQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
	const router = useRouter();
	const { query, setUrlQuery } = useFilterUrlQuery();

	const [keyword, setKeyword] = useState("");

	const { data } = useAllCriteriasQuery({
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
				className="w-full"
			/>
			<ChildrenItems
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
					...(data?.criterias.data.map(
						({ display_name, criteria_id }) => ({
							display_name,
							value: criteria_id,
							onClick() {
								setUrlQuery(`/criteria/${criteria_id}`, {
									criteria_id,
								});
							},
						})
					) || []),
				]}
			/>
		</div>
	);
}
