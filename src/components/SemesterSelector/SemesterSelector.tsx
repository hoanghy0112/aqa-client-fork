"use client";

import { getSemesterList } from "@/api/semester";
import { useFilter } from "@/contexts/FilterContext";
import { useEffect, useState } from "react";
import SemesterSelectorUI from "./SemesterSelectorUI";

export default function SemesterSelector() {
	const { semester, setSemester } = useFilter();
	const [semesters, setSemesters] = useState<Semester[]>([]);

	useEffect(() => {
		(async () => {
			const semesterList = await getSemesterList();
			setSemesters(semesterList);
		})();
	}, []);

	useEffect(() => {
		if (!semester && semesters.length > 0) setSemester?.(semesters[0]);
	}, [JSON.stringify(semesters)]);

	return (
		<SemesterSelectorUI
			semesters={semesters}
			semester={semester}
			setSemester={(d: Semester | undefined) => setSemester(d)}
		/>
	);
}
