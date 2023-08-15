"use client";

import useSWR from "swr";

import InfoTab from "@/components/InfoTab";

import ALL_COMMENT_ICON from "@assets/all_comment.svg";
import NEGATIVE_COMMENT_ICON from "@assets/negative_comment.svg";
import POSITIVE_COMMENT_ICON from "@assets/positive_comment.svg";

import { getCommentQuantity } from "@/api/comment";
import { GET_COMMENT_QUANTITY } from "@/constants/api_endpoint";
import { useContext } from "react";
import SemesterContext from "@/contexts/SemesterContext";

export default function CommentQuantityInfo() {
	const { semester } = useContext(SemesterContext);

	const { data, isLoading, error } = useSWR(
		`${GET_COMMENT_QUANTITY}?semester_id=${
			semester?.semester_id || "all"
		}&q=${""}`,
		(...args) => fetch(...args).then((r) => r.json())
	);

	return (
		<>
			<InfoTab
				defaultChecked
				link="all"
				icon={ALL_COMMENT_ICON}
				title="Tất cả"
				isLoading={isLoading}
				number={data?.total}
			/>
			<InfoTab
				link="positive"
				icon={POSITIVE_COMMENT_ICON}
				title="Tích cực"
				isLoading={isLoading}
				number={data?.positive}
			/>
			<InfoTab
				link="negative"
				icon={NEGATIVE_COMMENT_ICON}
				title="Tiêu cực"
				isLoading={isLoading}
				number={data?.negative}
			/>
		</>
	);
}
