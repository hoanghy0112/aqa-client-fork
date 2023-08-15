import AveragePointChart from "@/components/Chart/AveragePointChart";
import NavigationTab from "@/components/NavigationTab";
import SubjectTable from "@/components/SubjectTable";

export default function SubjectPage() {
	return (
		<div>
			<h1 className="font-semibold text-3xl">Môn học</h1>
			<NavigationTab
				classNames="mt-12"
				tabs={[
					{
						title: "Biểu đồ điểm trung bình",
						body: <AveragePointChart />,
					},
					{
						title: "Thống kê điểm trung bình qua các năm",
						body: <p></p>,
					},
				]}
			/>
			<SubjectTable />
		</div>
	);
}
