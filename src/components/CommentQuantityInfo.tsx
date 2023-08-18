"use client";

import useSWR from "swr";

import InfoTab from "@/components/InfoTab";

import ALL_COMMENT_ICON from "@assets/all_comment.svg";
import NEGATIVE_COMMENT_ICON from "@assets/negative_comment.svg";
import POSITIVE_COMMENT_ICON from "@assets/positive_comment.svg";

import { GET_COMMENT_QUANTITY } from "@/constants/api_endpoint";
import SemesterContext from "@/contexts/SemesterContext";
import { useContext } from "react";
import { useFilter } from "@/contexts/FilterContext";

export default function CommentQuantityInfo() {
	const { semester, keyword } = useFilter();
	// const { semester } = useContext(SemesterContext);

	const { data, isLoading, error } = useSWR(
		`${GET_COMMENT_QUANTITY}?semester_id=${
			semester?.semester_id || "all"
		}&q=${keyword || ""}`,
		(...args) => fetch(...args).then((r) => r.json())
	);

	return (
		<>
			<InfoTab
				link="all"
				icon={ALL_COMMENT_ICON}
				title="Tất cả"
				isLoading={isLoading}
				number={(data?.positive || 0) + (data?.negative || 0)}
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
