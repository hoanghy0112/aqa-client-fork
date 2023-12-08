"use client";

import NoData from "@/components/NoData";
import CommentItem from "@/components/comments/CommentItem";
import { GET_COMMENT_LIST } from "@/constants/api_endpoint";
import useIncrementalFetch from "@/hooks/useIncrementalFetch";
import Loading from "@components/Loading";
import { Card } from "@nextui-org/card";

import CommentQuantityInfo from "@/components/comments/CommentQuantityInfo";
import CommentSearchBar from "@/components/comments/CommentSearchBar";
import { ProgramSelectorWithSearchParam } from "@/components/selectors/ProgramSelector";
import { SemesterSelectorWithSearchParam } from "@/components/selectors/SemesterSelector";
import { SingleSubjectSelectorWithSearchParam } from "@/components/selectors/SingleSubjectSelector";
import { FilterProvider } from "@/contexts/FilterContext";
import { useRouter } from "next/navigation";

type Props = {
	params: { lecturer_id: string };
	searchParams: { [key: string]: string | undefined };
};

export default function Page({ params: { lecturer_id }, searchParams }: Props) {
	const router = useRouter();

	const { semester, keyword, program, type, subject_id } = searchParams;

	const {
		items: comments,
		hasMore,
		isLoading,
		bottomRef,
	} = useIncrementalFetch<IComment>({
		url: GET_COMMENT_LIST,
		query: {
			lecturer_id,
			q: keyword,
			semester_id: semester,
			subject_id,
			program,
			type,
		},
	});

	return (
		<FilterProvider>
			<div className="mt-14 flex flex-row items-center ">
				<div className="rounded-md flex flex-row overflow-hidden">
					<CommentQuantityInfo lecturer_id={lecturer_id} />
				</div>
				<div className=" flex flex-row gap-3 ml-auto mr-10">
					<SemesterSelectorWithSearchParam />
					<ProgramSelectorWithSearchParam />
					<SingleSubjectSelectorWithSearchParam
						lecturer_id={lecturer_id}
					/>
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
				{!hasMore && !isLoading ? <NoData /> : null}
				<div ref={bottomRef} />
			</Card>
		</FilterProvider>
	);
}
