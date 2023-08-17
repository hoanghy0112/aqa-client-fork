import CriteriaOverallChart from "@/components/Chart/CriteriaOverallChart";

export default function CriteriaPage() {
	return (
		<div>
			<h1 className="font-semibold text-3xl">Tiêu chí</h1>
			<div className="h-[400px]">
				<CriteriaOverallChart />
			</div>
		</div>
	);
}
