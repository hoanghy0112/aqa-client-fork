"use client";

import NoData from "@/components/NoData";
import CommentItem from "@/components/comments/CommentItem";
import { GET_COMMENT_LIST } from "@/constants/api_endpoint";
import useIncrementalFetch from "@/hooks/useIncrementalFetch";
import Loading from "@components/Loading";
import { Card } from "@nextui-org/card";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

type Props = {
	params: { subject_id: string };
	searchParams: { [key: string]: string | undefined };
};

export default function Page({ params: { subject_id }, searchParams }: Props) {
	const router = useRouter();

	const { semester, keyword, faculty, program, type } = searchParams;

	const {
		items: comments,
		hasMore,
		isLoading,
		bottomRef,
	} = useIncrementalFetch<IComment>({
		url: GET_COMMENT_LIST,
		query: {
			subject_id,
			type,
			q: keyword,
			semester_id: semester,
			program,
			faculty_name: faculty,
		},
	});

	return (
		<>
			<Card className="mt-8 mb-20 w-full p-5">
				{comments.map(
					({ content, type, comment_id, teach_id }: IComment) => (
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
				{hasMore ? <Loading /> : null}
				{!hasMore && !isLoading ? <NoData /> : null}
				<div ref={bottomRef} />
			</Card>
		</>
	);
}

export const metadata: Metadata = {
	title: "Thống kê bình luận",
};
