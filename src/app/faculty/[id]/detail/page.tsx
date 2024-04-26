"use client";

import PointWithGroupedEntity from "@/components/chart/PointWithGroupedEntity";
import PointEachSemester from "@/components/PointEachSemester";
import CriteriaSelector from "@/components/selectors/CriteriaSelector";
import ProgramSelector from "@/components/selectors/ProgramSelector";
import SubjectSelector from "@/components/selectors/SubjectSelector";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page() {
	const { query } = useFilterUrlQuery();

	return (
		<div className=" flex flex-col gap-5">
			<PointEachSemester
				query={query}
				title="Điểm đánh giá trung bình qua từng học kỳ"
				legend="Điểm đánh giá"
				selectors={
					<>
						<CriteriaSelector />
						<ProgramSelector />
						<SubjectSelector />
					</>
				}
			/>
			<PointWithGroupedEntity
				query={query}
				groupEntity="Criteria"
				title="Điểm đánh giá trung bình qua từng học kỳ"
				legend="Điểm đánh giá"
				selectors={
					<>
						<CriteriaSelector />
						<ProgramSelector />
						<SubjectSelector />
					</>
				}
			/>
		</div>
	);
}
