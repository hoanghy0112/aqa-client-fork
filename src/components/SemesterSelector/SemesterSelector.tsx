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

	return (
		<SemesterSelectorUI
			semesters={semesters}
			semester={semester}
			setSemester={(d: Semester | undefined) => setSemester(d)}
		/>
	);
}
