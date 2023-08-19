"use client";

import { useEffect } from "react";
import CommentItem from "./CommentItem";

import { GET_COMMENT_LIST } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import useIncrementalFetch from "@/hooks/useIncrementalFetch";
import Loading from "../Loading";

export default function CommentList({ type }: { type: string }) {
	const { semester, keyword, setIsLoading, faculty, program } = useFilter();

	const {
		items: comments,
		hasMore,
		isLoading,
		bottomRef,
	} = useIncrementalFetch<IComment>({
		url: GET_COMMENT_LIST,
		query: {
			type,
			q: keyword,
			semester_id: semester?.semester_id || "all",
			program,
			faculty_name: faculty,
		},
	});

	useEffect(() => {
		setIsLoading(isLoading);
	}, [isLoading, setIsLoading]);

	return (
		<>
			{comments.map(({ content, type, comment_id, teach_id }: IComment) => (
				<CommentItem
					key={comment_id}
					content={content}
					type={type}
					comment_id={comment_id}
					teach_id={teach_id}
					isLast={false}
				/>
			))}
			{hasMore ? <Loading ref={bottomRef} /> : null}
			{!hasMore && !isLoading ? (
				<div className="w-full flex flex-col pt-6 pb-4 items-center">
					<p className="w-fit text-lg font-semibold">
						Không còn bình luận nào
					</p>
				</div>
			) : null}
		</>
	);
}
