import AveragePointChart from "@/components/Chart/AveragePointChart";
import SubjectPointAcrossSemesterChart from "@/components/Chart/SubjectPointAcrossSemesterChart";
import NavigationTab from "@/components/NavigationTab";
import SubjectTable from "@/components/SubjectTable";
import { FilterProvider } from "@/contexts/FilterContext";

export default function SubjectPage() {
	return (
		<div>
			<h1 className="font-semibold text-3xl">Môn học</h1>
			<NavigationTab
				classNames="mt-12"
				tabs={[
					{
						title: "Biểu đồ điểm trung bình",
						body: (
							<FilterProvider>
								<AveragePointChart />
							</FilterProvider>
						),
					},
					{
						title: "Thống kê điểm trung bình qua các năm",
						body: (
							<FilterProvider>
								<SubjectPointAcrossSemesterChart />
							</FilterProvider>
						),
					},
				]}
			/>
			<SubjectTable />
		</div>
	);
}
