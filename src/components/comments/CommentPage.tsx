"use client";

import { SemesterSelectorWithSearchParam } from "@/components/selectors/SemesterSelector";

import { getCommentQuantityApi } from "@/api/graphql/comment.api";
import CommentQuantityInfo from "@/components/comments/CommentQuantityInfo";
import CommentSearchBar from "@/components/comments/CommentSearchBar";
import { FacultySelectorWithSearchParams } from "@/components/selectors/FacultySelector";
import { ProgramSelectorWithSearchParam } from "@/components/selectors/ProgramSelector";
import { SingleSubjectSelectorWithSearchParam } from "@/components/selectors/SingleSubjectSelector";
import { GET_COMMENT_LIST } from "@/constants/api_endpoint";
import useIncrementalFetch from "@/hooks/useIncrementalFetch";
import { useQuery } from "@apollo/client";
import { Card } from "@nextui-org/card";
import { useSearchParams } from "next/navigation";
import Loading from "../Loading";
import CommentItem from "./CommentItem";

export default function CommentPage({ defaultFilter = {}, selectors = [] }: IProps) {
	const searchParams = useSearchParams();

	const { data } = useQuery(getCommentQuantityApi, {
		variables: { type: "positive" },
	});

	console.log({ data: data });

	const query: IFilter = {
		...defaultFilter,
		type: searchParams.get("type"),
		q: searchParams.get("keyword"),
		semester_id: selectors.includes("semester")
			? searchParams.get("semester")
			: undefined,
		program: selectors.includes("program")
			? searchParams.get("program")
			: undefined,
		faculty_name: selectors.includes("faculty")
			? searchParams.get("faculty")
			: undefined,
		subject_id: selectors.includes("single-subject")
			? searchParams.get("subject_id")
			: undefined,
	};

	const {
		items: comments,
		hasMore,
		isLoading,
		bottomRef,
	} = useIncrementalFetch<IComment>({
		url: GET_COMMENT_LIST,
		query,
	});

	return (
		<div>
			<div className="flex flex-col xl:flex-row gap-8 xl:gap-0 items-center ">
				<div className="rounded-md flex flex-row overflow-hidden">
					<CommentQuantityInfo query={{ ...query, type: null }} />
				</div>
				<div className=" flex flex-row gap-3 xl:ml-auto xl:mr-10">
					{selectors.includes("semester") && (
						<SemesterSelectorWithSearchParam />
					)}
					{selectors.includes("program") && (
						<ProgramSelectorWithSearchParam />
					)}
					{selectors.includes("faculty") && (
						<FacultySelectorWithSearchParams />
					)}
					{selectors.includes("single-subject") && (
						<SingleSubjectSelectorWithSearchParam
							defaultFilter={defaultFilter}
						/>
					)}
				</div>
			</div>
			<CommentSearchBar />
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
				{!hasMore && !isLoading ? (
					<div className="w-full flex flex-col pt-6 pb-4 items-center">
						<p className="w-fit text-lg font-semibold">
							Không còn bình luận nào
						</p>
					</div>
				) : null}
				<div ref={bottomRef} />
			</Card>
		</div>
	);
}

interface IProps {
	defaultFilter?: IFilter;
	selectors?: SelectorType[];
}
