import SubjectPointAcrossSemesterChart from "@/components/chart/SubjectPointAcrossSemesterChart";
import { FilterProvider } from "@/contexts/FilterContext";

export default function Page() {
	return (
		<FilterProvider>
			<SubjectPointAcrossSemesterChart />
		</FilterProvider>
	);
}
