import getComments from "@/api/comment";
import CommentItem from "@/components/CommentItem/CommentItem";
import CommentList from "@/components/CommentList";

export function generateStaticParams() {
	return [{ type: "all" }, { type: "positive" }, { type: "negative" }];
}

export default async function Page({
	params: { type },
}: {
	params: { type: "all" | "positive" | "negative" };
}) {
	const comments = await getComments({ page: 0, type });

	return (
		<>
			{comments.data.map(
				({ content, type, comment_id, teach_id }: Comment) => (
					<CommentItem
						key={comment_id}
						content={content}
						type={type}
						comment_id={comment_id}
						teach_id={teach_id}
						isLast={false}
					/>
				)
			)}
			<CommentList type={type} />
		</>
	);
}
