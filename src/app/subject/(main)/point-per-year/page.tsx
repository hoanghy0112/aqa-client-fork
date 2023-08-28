import SubjectPointAcrossSemesterChart from "@/components/chart/SubjectPointAcrossSemesterChart";
import { Metadata } from "next";

export default function Page() {
	return <SubjectPointAcrossSemesterChart />;
}

export const metadata: Metadata = {
	title: "Điểm trung bình qua các năm",
};
