"use client";

import AveragePointChart from "@/components/chart/AveragePointChart";
import { FilterProvider } from "@/contexts/FilterContext";

export default function Page() {
	return (
		<FilterProvider>
			<AveragePointChart />
		</FilterProvider>
	);
}
