import SubjectPointAcrossSemesterChart from "@/components/chart/SubjectPointAcrossSemesterChart";
import { FilterProvider } from "@/contexts/FilterContext";
import { Metadata } from "next";

export default function Page() {
	return (
		<FilterProvider>
			<SubjectPointAcrossSemesterChart />
		</FilterProvider>
	);
}

export const metadata: Metadata = {
	title: "Điểm trung bình qua các năm",
};
