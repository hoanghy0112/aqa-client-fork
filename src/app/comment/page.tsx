import CommentList from "@/components/comments/CommentList";
import { Metadata } from "next";
// import { notFound } from "next/navigation";

type Props = {
	params: { type: "all" | "positive" | "negative" };
	searchParams: { [key: string]: string | undefined };
};

export default function Page({ searchParams }: Props) {
	const { semester, keyword, faculty, program, type } = searchParams;

	return (
		<CommentList
			semester={semester}
			faculty={faculty}
			program={program}
			keyword={keyword}
			type={type || ""}
		/>
	);
}

export function generateMetadata({ searchParams: { type } }: Props): Metadata {
	if (type == "negative")
		return {
			title: "Bình luận tiêu cực",
		};
	else if (type == "positive")
		return {
			title: "Bình luận tích cực",
		};
	return {
		title: "Tất cả bình luận",
	};
}
