"use client";

import SemesterSelector from "@/components/SemesterSelector/SemesterSelector";
import { ReactNode, useState } from "react";

import CommentQuantityInfo from "@/components/CommentQuantityInfo";
import CommentSearchBar from "@/components/CommentSearchBar";
import FacultySelector from "@/components/FacultySelector";
import ProgramSelector from "@/components/ProgramSelector";
import { Card } from "@nextui-org/react";
import { CommentContext } from "../../contexts/CommentPageContext";

export default function CommentLayout({ children }: { children: ReactNode }) {
	const [keyword, setKeyword] = useState<string>("");
	const [program, setProgram] = useState<string>("");
	const [faculty, setFaculty] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<>
			<h1 className="font-semibold text-3xl">Bình luận</h1>
			<div className="mt-14 flex flex-row items-center ">
				<div className="rounded-md flex flex-row overflow-hidden">
					<CommentQuantityInfo keyword={keyword} />
				</div>
				<div className=" flex flex-row gap-3 ml-auto mr-10">
					<SemesterSelector />
					<ProgramSelector program={program} setProgram={setProgram} />
					<FacultySelector faculty={faculty} setFaculty={setFaculty} />
				</div>
			</div>
			<CommentSearchBar
				keyword={keyword}
				setKeyword={setKeyword}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
			<CommentContext.Provider value={{ keyword, isLoading, setIsLoading }}>
				<Card className="mt-8 mb-20 w-full p-5">{children}</Card>;
			</CommentContext.Provider>
		</>
	);
}
