import SemesterSelector from "@/components/SemesterSelector/SemesterSelector";
import { ReactNode } from "react";

import CommentQuantityInfo from "@/components/CommentQuantityInfo";
import CommentSearchBar from "@/components/CommentSearchBar";
import CommentWrapper from "@/components/CommentWrapper";
import FacultySelector from "@/components/FacultySelector";
import ProgramSelector from "@/components/ProgramSelector";
import CommentProvider from "./provider";

export default async function CommentLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<>
			<h1 className="font-semibold text-3xl">Bình luận</h1>
			<CommentProvider>
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
				<CommentWrapper>{children}</CommentWrapper>
			</CommentProvider>
		</>
	);
}
