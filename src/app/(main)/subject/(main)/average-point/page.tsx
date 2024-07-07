"use client";

import PointWithGroupedEntity from "@/components/chart/PointWithGroupedEntity";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Metadata } from "next";

export default function Page() {
	const { query, setUrlQuery } = useFilterUrlQuery();

	return (
		<PointWithGroupedEntity
			query={query}
			title="Điểm trung bình từng môn học"
			groupEntity="Subject"
			onClick={(item) => setUrlQuery(`/subject/${item.id}`)}
		/>
	);
}

// export const metadata: Metadata = {
// 	title: "Biểu đồ điểm trung bình",
// };
