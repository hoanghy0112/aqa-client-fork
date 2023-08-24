import CriteriaOverallChart from "@/components/chart/CriteriaOverallChart";
import { Metadata } from "next";

export default function CriteriaPage() {
	return <CriteriaOverallChart />;
}

export const metadata: Metadata = {
	title: "Thống kê các tiêu chí",
};
