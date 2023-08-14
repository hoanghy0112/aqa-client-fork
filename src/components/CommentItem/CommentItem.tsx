import COPY_ICON from "@assets/copy.svg";
import Image from "next/image";

export default function CommentItem({
	content,
	type,
	comment_id,
	teach_id,
	isLast,
	fetchNewData,
}: {
	content: string;
	type: "positive" | "negative";
	comment_id: string;
	teach_id: string;
	isLast: boolean;
	fetchNewData: () => void;
}) {
	return (
		<div className="px-10 py-20 flex flex-row border-b-1 border-b-slate-400">
			<p>{content}</p>
			<Image src={COPY_ICON} width={24} height={24} alt="Copy comment" />
		</div>
	);
}
