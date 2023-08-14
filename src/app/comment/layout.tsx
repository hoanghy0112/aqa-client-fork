import InfoTab from "@/components/InfoTab";

import SemesterSelector from "@/components/SemesterSelector/SemesterSelector";
import ALL_COMMENT_ICON from "@assets/all_comment.svg";
import NEGATIVE_COMMENT_ICON from "@assets/negative_comment.svg";
import POSITIVE_COMMENT_ICON from "@assets/positive_comment.svg";
import { ReactNode } from "react";

import CommentWrapper from "@/components/CommentWrapper";

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
					<InfoTab
						defaultChecked
						link="all"
						icon={ALL_COMMENT_ICON}
						title="Tất cả"
						number={0}
					/>
					<InfoTab
						link="positive"
						icon={POSITIVE_COMMENT_ICON}
						title="Tích cực"
						number={0}
					/>
					<InfoTab
						link="negative"
						icon={NEGATIVE_COMMENT_ICON}
						title="Tiêu cực"
						number={0}
					/>
				</div>
				<div className="ml-auto mr-10">
					<SemesterSelector />
				</div>
			</div>
			<CommentWrapper>{children}</CommentWrapper>
		</div>
	);
}
