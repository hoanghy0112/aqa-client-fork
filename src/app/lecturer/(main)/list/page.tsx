"use client";

import BreadCrumb from "@/components/BreadCrumb";
import LecturerTable from "@/components/lecturers/LecturerTable";
import { FilterProvider } from "@/contexts/FilterContext";

export default function Page() {
	return (
		<>
			<FilterProvider>
				<LecturerTable />
			</FilterProvider>
		</>
	);
}
