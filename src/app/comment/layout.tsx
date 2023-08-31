"use client";

import { SemesterSelectorWithSearchParam } from "@/components/selectors/SemesterSelector";
import { ReactNode } from "react";

import CommentQuantityInfo from "@/components/comments/CommentQuantityInfo";
import CommentSearchBar from "@/components/comments/CommentSearchBar";
import { FacultySelectorWithSearchParams } from "@/components/selectors/FacultySelector";
import { ProgramSelectorWithSearchParam } from "@/components/selectors/ProgramSelector";
import { FilterProvider } from "@/contexts/FilterContext";
import { Card } from "@nextui-org/card";

function CommentLayout_({ children }: { children: ReactNode }) {
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
