"use client";

import SemesterSelector, {
	SemesterSelectorWithSearchParam,
} from "@/components/selectors/SemesterSelector";
import { ReactNode, useEffect } from "react";

import CommentQuantityInfo from "@/components/comments/CommentQuantityInfo";
import CommentSearchBar from "@/components/comments/CommentSearchBar";
import FacultySelector, {
	FacultySelectorWithSearchParams,
} from "@/components/selectors/FacultySelector";
import ProgramSelector, {
	ProgramSelectorWithSearchParam,
} from "@/components/selectors/ProgramSelector";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import { Card } from "@nextui-org/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import withQuery from "@/utils/withQuery";

function CommentLayout_({ children }: { children: ReactNode }) {
	// const { semester, faculty, program, setSemester, setFaculty, setProgram } =
	// 	useFilter();
	// const pathname = usePathname();
	// const searchParams = useSearchParams();
	// const router = useRouter();

	// useEffect(() => {
	// 	router.push(
	// 		withQuery(pathname, {
	// 			semester: semester?.semester_id,
	// 			faculty: faculty?.faculty_id,
	// 			program,
	// 		})
	// 	);
	// }, [semester, faculty, program, router, pathname]);

	// useEffect(() => {
	// 	// const { semester, faculty, program } = searchParams;
	// 	// setSemester(semester);
	// }, [pathname, searchParams]);

	return (
		<>
			<h1 className="font-semibold text-3xl">Bình luận</h1>
			<div className="mt-14 flex flex-row items-center ">
				<div className="rounded-md flex flex-row overflow-hidden">
					<CommentQuantityInfo />
				</div>
				<div className=" flex flex-row gap-3 ml-auto mr-10">
					<SemesterSelectorWithSearchParam />
					<ProgramSelectorWithSearchParam />
					<FacultySelectorWithSearchParams />
				</div>
			</div>
			<CommentSearchBar />
			<Card className="mt-8 mb-20 w-full p-5">{children}</Card>
		</>
	);
}

export default function CommentLayout({ children }: { children: ReactNode }) {
	return (
		<FilterProvider>
			<CommentLayout_>{children}</CommentLayout_>
		</FilterProvider>
	);
}
