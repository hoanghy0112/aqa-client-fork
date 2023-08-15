"use client";

import { getSemesterList } from "@/api/semester";
import SemesterSelectorUI from "./SemesterSelectorUI";
import { useContext, useEffect, useState } from "react";
import SemesterContext from "@/contexts/SemesterContext";

export default function SemesterSelector() {
	const { semester, setSemester } = useContext(SemesterContext);
	const [semesters, setSemesters] = useState<Semester[]>([]);

	useEffect(() => {
		(async () => {
			const semesterList = await getSemesterList();
			setSemesters(semesterList);
			if (!semester && semesterList.length > 0) setSemester(semesterList[0]);
		})();
	}, []);

	return <SemesterSelectorUI semesters={semesters} />;
}
