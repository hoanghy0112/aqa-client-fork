"use client";

import CommentQuantityInfo from "@/components/comments/CommentQuantityInfo";
import CommentSearchBar from "@/components/comments/CommentSearchBar";
import { ProgramSelectorWithSearchParam } from "@/components/selectors/ProgramSelector";
import { SemesterSelectorWithSearchParam } from "@/components/selectors/SemesterSelector";
import { SingleSubjectSelectorWithProps } from "@/components/selectors/SingleSubjectSelector";
import { FilterProvider } from "@/contexts/FilterContext";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
	params: { subject_id: string };
	searchParams: { [key: string]: string | undefined };
	children: ReactNode;
};

export default function Layout({
	params: { subject_id },
	children,
	searchParams,
}: Props) {
	const router = useRouter();

	return (
		<FilterProvider>
			<div className="mt-14 flex flex-row items-center ">
				<div className="rounded-md flex flex-row overflow-hidden">
					<CommentQuantityInfo subject_id={subject_id} />
				</div>
				<div className=" flex flex-row gap-3 ml-auto mr-10">
					<SemesterSelectorWithSearchParam />
					<ProgramSelectorWithSearchParam />
					<SingleSubjectSelectorWithProps
						subjectId={subject_id}
						setSubjectId={(d) => {
							router.push(`/subject/${d}/comments`);
						}}
					/>
				</div>
			</div>
			<CommentSearchBar />
			{children}
		</FilterProvider>
	);
}

export const metadata: Metadata = {
	title: "Thống kê bình luận",
};
