"use client";

import BreadCrumb from "@/components/BreadCrumb";
import LecturerTable from "@/components/lecturers/LecturerTable";
import { FilterProvider } from "@/contexts/FilterContext";

export default function Page() {
	return (
		<>
			<h1 className="font-semibold text-3xl">Giảng viên</h1>
			<BreadCrumb />
			<FilterProvider>
				<LecturerTable />
			</FilterProvider>
		</>
	);
}
