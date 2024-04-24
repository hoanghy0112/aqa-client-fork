"use client";

import { useOverallCriteriaPointsEachSemesterLazyQuery } from "@/gql/graphql";
import PointEachSemester from "../PointEachSemester";
import ProgramSelector from "../selectors/ProgramSelector";

export default function CriteriaOverallChart() {
	const [getPoints] = useOverallCriteriaPointsEachSemesterLazyQuery();

	return (
		<PointEachSemester
			title="Điểm đánh giá trung bình qua từng học kỳ"
			legend="Điểm đánh giá"
			selectors={
				<>
					<ProgramSelector />
				</>
			}
			fetchFunction={async (options) => {
				return (await getPoints(options)).data?.groupedPoints.data || [];
			}}
		/>
	);
}

const dataFormatter = (number: number) => {
	return `${number.toFixed(2)}`;
};

interface IChartData {
	display_name: string;
	criteria_id: string;
	point: number;
	index: number;
	num: number;
}

const LEGEND = "Độ hài lòng";
