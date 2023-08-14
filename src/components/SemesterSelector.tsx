"use client";

import SemesterContext from "@/contexts/SemesterContext";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Input,
} from "@nextui-org/react";
import { useContext } from "react";

export default function SemesterSelector({
	semesters,
}: {
	semesters: Semester[];
}) {
	const { semester, setSemester } = useContext(SemesterContext);

	return (
		<Dropdown backdrop="blur">
			<DropdownTrigger>
				<Button variant="bordered">
					{semester?.display_name || "Chọn học kỳ"}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				variant="faded"
				aria-label="Static Actions"
				onAction={(key) =>
					setSemester?.(semesters.find((v) => v.semester_id === key))
				}
			>
				<DropdownSection title="Chọn học kỳ">
					{semesters.map(({ display_name, semester_id }) => (
						<DropdownItem className="py-2" key={semester_id}>
							{display_name}
						</DropdownItem>
					))}
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
}
