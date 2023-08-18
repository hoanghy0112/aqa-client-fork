"use client";

import { motion } from "framer-motion";

import getComments from "@/api/comment";
import { useEffect, useRef, useState } from "react";
import CommentItem from "./CommentItem/CommentItem";

import { useFilter } from "@/contexts/FilterContext";
import { Skeleton, Spinner } from "@nextui-org/react";

export default function CommentList({ type }: { type: string }) {
	const { semester, keyword, setIsLoading } = useFilter();

	const [comments, setComments] = useState<Comment[]>([]);
	const [page, setPage] = useState(0);

	const [hasNext, setHasNext] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);

	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		(async () => {
			if (hasNext) setLoading(true);
			const comments = await getComments({
				page,
				type,
				q: keyword,
				semester: semester?.semester_id || "all",
			});
			setIsLoading?.(false);
			setHasNext(comments.meta.has_next);
			if (page == 0) setComments(comments.data);
			else setComments((prev: Comment[]) => [...prev, ...comments.data]);
		})();
	}, [page, type, keyword, semester?.semester_id]);

	useEffect(() => {
		setHasNext(true);
		setComments([]);
		setPage(0);
	}, [type, semester?.semester_id, keyword]);

	useEffect(() => {
		setLoading(false);
		if (!bottomRef?.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setPage(page + 1);
				bottomRef.current?.scrollTo();
				observer.unobserve(entry.target);
			}
		});

		observer.observe(bottomRef.current);
	}, [comments.length]);

	return (
		<>
			{comments.map(({ content, type, comment_id, teach_id }: Comment) => (
				<CommentItem
					key={comment_id}
					content={content}
					type={type}
					comment_id={comment_id}
					teach_id={teach_id}
					isLast={false}
				/>
			))}
			<div ref={bottomRef} />
			{hasNext ? (
				<>
					{Array(4)
						.fill("")
						.map((_, index) => (
							<div
								key={index}
								className="px-3 py-4 w-full flex flex-row items-center border-b-1 border-b-slate-400 dark:border-b-slate-600"
							>
								<Skeleton className={`rounded-md`}>
									<motion.div
										className="h-12"
										initial={{ width: 0 }}
										animate={{
											width: Math.floor(Math.random() * 500 + 200),
										}}
										transition={{
											ease: "easeOut",
											duration: 0.3,
										}}
									/>
								</Skeleton>
								<div className="ml-auto w-56 pl-5 flex shrink-0 flex-row gap-5">
									<Skeleton className="w-12 rounded-md">
										<div className="w-full h-12"></div>
									</Skeleton>
									<Skeleton className="w-28 rounded-md">
										<div className="w-full h-12"></div>
									</Skeleton>
								</div>
							</div>
						))}
				</>
			) : (
				<div className="w-full flex flex-col pt-6 pb-4 items-center">
					<p className="w-fit text-lg font-semibold">
						Không còn bình luận nào
					</p>
				</div>
			)}
			{loading && hasNext ? (
				<>
					<div className="w-full pt-9 pb-5 flex flex-row justify-center gap-5 items-center">
						<Spinner size="md" />
						<p className=" text-lg font-semibold">
							Đang tải thêm bình luận
						</p>
					</div>
				</>
			) : null}
		</>
	);
}
