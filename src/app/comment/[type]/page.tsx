import CommentList from "@/components/comments/CommentList";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
	params: { type: "all" | "positive" | "negative" };
};

export default function Page({ params: { type } }: Props) {
	if (!["all", "positive", "negative"].includes(type)) notFound();

	return <CommentList type={type} />;
}

export function generateMetadata({ params: { type } }: Props): Metadata {
	if (type == "all")
		return {
			title: "Tất cả bình luận",
		};
	else if (type == "positive")
		return {
			title: "Bình luận tích cực",
		};
	return {
		title: "Bình luận tiêu cực",
	};
}
