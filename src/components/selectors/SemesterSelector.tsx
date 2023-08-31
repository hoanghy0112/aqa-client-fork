"use client";

import { getSemesterList } from "@/api/semester";
import { useFilter } from "@/contexts/FilterContext";
import useNavigate from "@/hooks/useNavigate";
import withQuery from "@/utils/withQuery";
import { Button } from "@nextui-org/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

function SemesterSelector_({
	semester,
	setSemester,
	semesters,
}: {
	semester?: Semester;
	setSemester: (d?: Semester) => any;
	semesters: Semester[];
}) {
	return (
		<Dropdown backdrop="blur" shouldBlockScroll={false}>
			<DropdownTrigger>
				<Button variant="bordered" className="">
					<p className="font-medium w-fit">
						{semester?.semester_name || "Tất cả học kỳ"}
					</p>
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				variant="faded"
				aria-label="Semester dropwdown"
				selectionMode="single"
				selectedKeys={new Set([semester?.semester_id || ""])}
				onAction={(key) => {
					if (key === "")
						setSemester?.({
							semester_name: "Tất cả học kỳ",
							semester_id: "",
						});
					else setSemester(semesters.find((v) => v.semester_id === key));
				}}
			>
				<DropdownSection title="Chọn học kỳ">
					{semesters.map(({ semester_name, semester_id }) => (
						<DropdownItem className={`py-2`} key={semester_id}>
							<p className="font-medium"> {semester_name}</p>
						</DropdownItem>
					))}
				</DropdownSection>
				<DropdownSection title={"Khác"}>
					<DropdownItem className={`py-2`} key={""}>
						<p className="font-medium">Tất cả</p>
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
}

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
		<SemesterSelector_
			semester={semester}
			setSemester={setSemester}
			semesters={semesters}
		/>
	);
}

export function SemesterSelectorWithSearchParam() {
	const searchParams = useSearchParams();
	const navigate = useNavigate();

	const [semesters, setSemesters] = useState<Semester[]>([]);

	const semester = useMemo<Semester | undefined>(() => {
		if (semesters.length > 0) {
			if (searchParams.has("semester")) {
				const semesterId = searchParams.get("semester");
				return semesters.find((v) => v.semester_id == semesterId);
			} else {
				if (searchParams.get("semester") == "") {
					return {
						semester_id: "",
						semester_name: "",
					};
				}
			}
		}
		return undefined;
	}, [searchParams, semesters]);

	const setSemester = useCallback(
		(semester: Semester | undefined) => {
			if (semester)
				navigate.replace({ semester: semester?.semester_id || "" });
		},
		[navigate]
	);

	useEffect(() => {
		(async () => {
			const semesterList = await getSemesterList();
			setSemesters(semesterList);
		})();
	}, []);

	return (
		<SemesterSelector_
			semester={semester}
			setSemester={setSemester}
			semesters={semesters}
		/>
	);
}
