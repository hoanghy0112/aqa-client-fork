"use client";

import useSWR from "swr";

import InfoTab from "@/components/InfoTab";

import ALL_COMMENT_ICON from "@assets/all_comment.svg";
import NEGATIVE_COMMENT_ICON from "@assets/negative_comment.svg";
import POSITIVE_COMMENT_ICON from "@assets/positive_comment.svg";

import { GET_COMMENT_QUANTITY } from "@/constants/api_endpoint";
import withQuery from "@/utils/withQuery";
import { useSearchParams } from "next/navigation";

export default function CommentQuantityInfo() {
	const searchParams = useSearchParams();

	const { data, isLoading, error } = useSWR(
		withQuery(GET_COMMENT_QUANTITY, {
			semester_id: searchParams.get("semester"),
			program: searchParams.get("program"),
			faculty_name: searchParams.get("faculty"),
			keyword: searchParams.get("keyword"),
		}),
		(...args) => fetch(...args).then((r) => r.json())
	);

	return (
		<>
			<InfoTab
				type="all"
				icon={ALL_COMMENT_ICON}
				title="Tất cả"
				isLoading={isLoading}
				number={(data?.positive || 0) + (data?.negative || 0)}
			/>
			<InfoTab
				type="positive"
				icon={POSITIVE_COMMENT_ICON}
				title="Tích cực"
				isLoading={isLoading}
				number={data?.positive}
			/>
			<InfoTab
				type="negative"
				icon={NEGATIVE_COMMENT_ICON}
				title="Tiêu cực"
				isLoading={isLoading}
				number={data?.negative}
			/>
		</>
	);
}
