import CriteriaOverallChart from "@/components/chart/CriteriaOverallChart";
import { FilterProvider } from "@/contexts/FilterContext";
import { Metadata } from "next";

export default function Page() {
	return (
		<FilterProvider>
			<CriteriaOverallChart />
		</FilterProvider>
	);
}

export const metadata: Metadata = {
	title: "Điểm trung bình qua các năm",
};
