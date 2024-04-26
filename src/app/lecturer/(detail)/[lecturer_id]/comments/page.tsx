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
import CommentPage from "@/components/comments/CommentPage";

type Props = {
	params: { lecturer_id: string };
	searchParams: { [key: string]: string | undefined };
};

export default function Page({ params: { lecturer_id }, searchParams }: Props) {
	return (
		<CommentPage
			defaultFilter={{ lecturer_id }}
			selectors={["program", "semester", "single-subject"]}
		/>
	);
}
