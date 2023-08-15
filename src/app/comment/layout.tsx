import SemesterSelector from "@/components/SemesterSelector/SemesterSelector";
import { ReactNode } from "react";

import CommentWrapper from "@/components/CommentWrapper";
import CommentQuantityInfo from "@/components/CommentQuantityInfo";

export default async function CommentLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="pt-12">
			<h1 className="font-semibold text-3xl">Bình luận</h1>
			<div className="mt-20 flex flex-row items-center ">
				<div className="rounded-md flex flex-row overflow-hidden">
					<CommentQuantityInfo />
				</div>
				<div className="ml-auto mr-10">
					<SemesterSelector />
				</div>
			</div>
			<CommentWrapper>{children}</CommentWrapper>
		</div>
	);
}
