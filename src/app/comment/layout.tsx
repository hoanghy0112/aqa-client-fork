import SemesterSelector from "@/components/SemesterSelector/SemesterSelector";
import { ReactNode } from "react";

import CommentWrapper from "@/components/CommentWrapper";
import CommentQuantityInfo from "@/components/CommentQuantityInfo";
import CommentProvider from "./provider";
import CommentSearchBar from "@/components/CommentSearchBar";

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
					<div className="ml-auto mr-10">
						<SemesterSelector />
					</div>
				</div>
				<CommentSearchBar />
				<CommentWrapper>{children}</CommentWrapper>
			</CommentProvider>
		</>
	);
}
