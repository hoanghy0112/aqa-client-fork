import InfoTab from "@/components/InfoTab";

import ALL_COMMENT_ICON from "@assets/all_comment.svg";
import POSITIVE_COMMENT_ICON from "@assets/positive_comment.svg";
import NEGATIVE_COMMENT_ICON from "@assets/negative_comment.svg";
import { ReactNode } from "react";
import SemesterSelector from "@/components/SemesterSelector";
import { getSemesterList } from "@/api/semester";

export default async function CommentLayout({
	children,
}: {
	children: ReactNode;
}) {
	const semesters = await getSemesterList();

	return (
		<div className="px-10 pt-12">
			<h1 className="font-semibold text-3xl">Bình luận</h1>
			<div className="mt-20 flex flex-row items-center">
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
				<div className="ml-auto mr-10">
					<SemesterSelector semesters={semesters} />
				</div>
			</div>
			<div className="">{children}</div>
		</div>
	);
}
