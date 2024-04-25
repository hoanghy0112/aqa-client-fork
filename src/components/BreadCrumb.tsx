"use client";

import {
	useDetailCriteriaQuery,
	useDetailLecturerQuery,
	useDetailSubjectQuery,
	useSemestersQuery,
} from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function BreadCrumb() {
	const router = useRouter();

	const { query, setUrlQuery } = useFilterUrlQuery();

	const { data: criteria } = useDetailCriteriaQuery({
		variables: { id: query?.criteria_id || "" },
		skip: !query?.criteria_id,
	});

	const { data: semesters } = useSemestersQuery({
		skip: !query?.semester_id,
	});

	const { data: subject } = useDetailSubjectQuery({
		variables: { id: query?.subjects?.at(0) || "" },
		skip: !query?.subjects?.length,
	});

	const { data: lecturer } = useDetailLecturerQuery({
		variables: { id: query?.lecturer_id || "" },
		skip: !query?.lecturer_id,
	});

	const paths = [
		{
			title: "Tiêu chí",
			link: "criteria",
			value: query?.criteria_id,
			name: criteria?.criteria?.display_name,
		},
		{
			title: "Học kỳ",
			link: "semester",
			value: query?.semester_id,
			name: semesters?.semesters?.find(
				(semester) => semester.semester_id === query.semester_id
			)?.display_name,
		},
		{ title: "Khoa", link: "faculty", value: query?.faculty_id, name: "" },
		{
			title: "Môn học",
			link: "subject",
			value: query?.subjects?.at(0),
			name: subject?.subject?.display_name,
		},
		{
			title: "Giảng viên",
			link: "lecturer",
			value: query?.lecturer_id,
			name: lecturer?.lecturer?.display_name,
		},
	];

	return (
		<div className=" mt-5 flex flex-row gap-2">
			{paths.map(({ title, name, link, value }) => (
				<Button
					key={title}
					variant="light"
					className=" h-fit"
					onClick={() => {
						setUrlQuery(`/${link}`, {});
					}}
				>
					<div className=" p-2 flex-col gap-2 items-start">
						<p className=" text-black text-xs text-start">{title}</p>
						<p className=" h-auto max-w-[350px] whitespace-normal text-black text-start font-semibold">
							{name || "Tất cả"}
						</p>
					</div>
				</Button>
			))}
		</div>
	);
}
