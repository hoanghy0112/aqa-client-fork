import AveragePointChart from "@/components/chart/AveragePointChart";
import { Metadata } from "next";

export default function Page() {
	return <AveragePointChart />;
}

export const metadata: Metadata = {
	title: "Biểu đồ điểm trung bình",
};
