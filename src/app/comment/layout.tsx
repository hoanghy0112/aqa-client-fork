"use client";

import SemesterSelector from "@/components/SemesterSelector/SemesterSelector";
import { ReactNode } from "react";

import CommentQuantityInfo from "@/components/CommentQuantityInfo";
import CommentSearchBar from "@/components/CommentSearchBar";
import FacultySelector from "@/components/FacultySelector";
import ProgramSelector from "@/components/ProgramSelector";
import CommentProvider from "./provider";
import { Card } from "@nextui-org/react";

export default function CommentLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<h1 className="font-semibold text-3xl">Bình luận</h1>
			<CommentProvider>
				{({
					faculty,
					setFaculty,
					program,
					setProgram,
					keyword,
					setKeyword,
					isLoading,
					setIsLoading,
				}) => (
					<>
						<div className="mt-14 flex flex-row items-center ">
							<div className="rounded-md flex flex-row overflow-hidden">
								<CommentQuantityInfo keyword={keyword} />
							</div>
							<div className=" flex flex-row gap-3 ml-auto mr-10">
								<SemesterSelector />
								<ProgramSelector
									program={program}
									setProgram={setProgram}
								/>
								<FacultySelector
									faculty={faculty}
									setFaculty={setFaculty}
								/>
							</div>
						</div>
						<CommentSearchBar
							keyword={keyword}
							setKeyword={setKeyword}
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
						<Card className="mt-8 mb-20 w-full p-5">{children}</Card>;
					</>
				)}
			</CommentProvider>
		</>
	);
}
