import AveragePointChart from "@/components/chart/AveragePointChart";
import { FilterProvider } from "@/contexts/FilterContext";
import { Metadata } from "next";

export default function Page() {
	return (
		<FilterProvider>
			<AveragePointChart />
		</FilterProvider>
	);
}

export const metadata: Metadata = {
	title: "Biểu đồ điểm trung bình",
};
