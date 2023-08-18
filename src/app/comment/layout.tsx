"use client";

import SemesterSelector from "@/components/SemesterSelector/SemesterSelector";
import { ReactNode } from "react";

import CommentQuantityInfo from "@/components/CommentQuantityInfo";
import CommentSearchBar from "@/components/CommentSearchBar";
import FacultySelector from "@/components/FacultySelector";
import ProgramSelector from "@/components/ProgramSelector";
import { FilterProvider } from "@/contexts/FilterContext";
import { Card } from "@nextui-org/react";

export default function CommentLayout({ children }: { children: ReactNode }) {
	return (
		<FilterProvider>
			<h1 className="font-semibold text-3xl">Bình luận</h1>
			<div className="mt-14 flex flex-row items-center ">
				<div className="rounded-md flex flex-row overflow-hidden">
					<CommentQuantityInfo />
				</div>
				<div className=" flex flex-row gap-3 ml-auto mr-10">
					<SemesterSelector />
					<ProgramSelector />
					<FacultySelector />
				</div>
			</div>
			<CommentSearchBar />
			<Card className="mt-8 mb-20 w-full p-5">{children}</Card>
		</FilterProvider>
	);
}
