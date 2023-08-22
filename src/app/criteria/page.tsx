import CriteriaOverallChart from "@/components/chart/CriteriaOverallChart";
import { FilterProvider } from "@/contexts/FilterContext";
import { Metadata } from "next";

export default function CriteriaPage() {
	return (
		<FilterProvider>
			<CriteriaOverallChart />
		</FilterProvider>
	);
}

export const metadata: Metadata = {
	title: "Thống kê các tiêu chí",
};
