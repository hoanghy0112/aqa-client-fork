"use client";

import { getSemesterList } from "@/api/semester";
import SemesterContext from "@/contexts/SemesterContext";
import { useContext, useEffect, useMemo, useState } from "react";
import SemesterSelectorUI from "./SemesterSelectorUI";

export default function SemesterSelector({
	semester,
	setSemester,
}: {
	semester?: Semester | undefined;
	setSemester?: (d: Semester | undefined) => void;
}) {
	const { semester: _semester, setSemester: _setSemester } =
		useContext(SemesterContext);
	const [semesters, setSemesters] = useState<Semester[]>([]);

	const updateSemester = useMemo(() => setSemester || _setSemester, []);

	useEffect(() => {
		(async () => {
			const semesterList = await getSemesterList();
			setSemesters(semesterList);
		})();
	}, []);

	useEffect(() => {
		if (!semester && semesters.length > 0) updateSemester?.(semesters[0]);
	}, [JSON.stringify(semesters)]);

	return (
		<SemesterSelectorUI
			semesters={semesters}
			semester={semester || _semester}
			setSemester={updateSemester}
		/>
	);
}
