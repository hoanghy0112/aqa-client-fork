import { getSemesterList } from "@/api/semester";
import SemesterSelectorUI from "./SemesterSelectorUI";

export default async function SemesterSelector() {
	const semesters = await getSemesterList();

	return <SemesterSelectorUI semesters={semesters} />;
}
