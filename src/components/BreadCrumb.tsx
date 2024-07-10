"use client";

import {
	useDetailClassQuery,
	useDetailCriteriaQuery,
	useDetailFacultyQuery,
	useDetailSubjectQuery,
	useSemestersQuery,
} from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import useLecturerInfo from "@/hooks/useLecturerInfo";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export default function BreadCrumb() {
	const router = useRouter();
	const pathname = usePathname();

	const { query, setUrlQuery } = useFilterUrlQuery();

	const { data: criteria } = useDetailCriteriaQuery({
		variables: { id: query?.criteria_id || "" },
		skip: !query?.criteria_id,
	});

	const { data: semesters } = useSemestersQuery({
		skip: !query?.semester_id,
	});

	const { data: faculty } = useDetailFacultyQuery({
		variables: { id: query?.faculty_id || "" },
		skip: !query.faculty_id,
	});

	const { data: subject } = useDetailSubjectQuery({
		variables: { id: query?.subjects?.at(0) || "" },
		skip: !query?.subjects?.length,
	});

	const { lecturer } = useLecturerInfo(query.lecturer_id || "");

	const { data: classData } = useDetailClassQuery({
		variables: { id: query?.class_id || "" },
		skip: !query?.class_id,
	});

	const paths = useMemo(
		() => [
			{
				title: "Tiêu chí",
				link: "criteria",
				className: " flex-initial w-[300px]",
				value: query?.criteria_id,
				name: criteria?.criteria?.display_name,
				onClickValue: {
					criteria_id: "",
					// semester_id: "",
					// faculty_id: "",
					// subjects: undefined,
					// lecturer_id: "",
					// class_id: "",
				},
			},
			{
				title: "Học kỳ",
				link: "semester",
				className: " flex-initial w-[150px]",
				value: query?.semester_id,
				name: semesters?.semesters?.find(
					(semester) => semester.semester_id === query.semester_id
				)?.display_name,
				onClickValue: {
					semester_id: "",
					// faculty_id: "",
					// subjects: undefined,
					// lecturer_id: "",
					// class_id: "",
				},
			},
			{
				title: "Khoa",
				link: "faculty",
				className: " flex-initial w-[150px]",
				value: query?.faculty_id,
				name: faculty?.faculty?.display_name,
				onClickValue: {
					faculty_id: "",
					// subjects: undefined,
					// lecturer_id: "",
					// class_id: "",
				},
			},
			{
				title: "Môn học",
				link: "subject",
				value: query?.subjects?.at(0),
				name: subject?.subject?.display_name,
				onClickValue: {
					subjects: undefined,
					// lecturer_id: "",
					// class_id: "",
				},
			},
			{
				title: "Giảng viên",
				link: "lecturer",
				value: query?.lecturer_id,
				name: lecturer?.display_name,
				onClickValue: {
					lecturer_id: "",
					// class_id: "",
				},
			},
			{
				title: "Lớp",
				link: "class",
				value: query?.class_id,
				name: classData?.class?.display_name,
				onClickValue: {
					class_id: "",
				},
			},
		],
		[
			classData?.class?.display_name,
			criteria?.criteria?.display_name,
			faculty?.faculty?.display_name,
			lecturer?.display_name,
			query?.class_id,
			query?.criteria_id,
			query?.faculty_id,
			query?.lecturer_id,
			query.semester_id,
			query?.subjects,
			semesters?.semesters,
			subject?.subject?.display_name,
		]
	);

	console.log(pathname);
	return (
		<div className=" mt-5 mb-5 w-fit flex flex-col items-start gap-4">
			<div className=" -ml-5 flex flex-row gap-2">
				{paths.map(
					({ className, title, name, link, value, onClickValue }) => (
						<Button
							key={title}
							variant="light"
							className={twMerge(
								" flex-1 h-fit",
								name ? className : ""
							)}
							onClick={() => {
								setUrlQuery(`/${link}`, onClickValue);
							}}
						>
							<div className=" p-2 flex-col gap-2 items-start">
								<p className=" text-foreground-900 text-xs text-start">
									{title}
								</p>
								<p className=" h-auto max-w-[350px] whitespace-normal text-foreground-900 text-start font-semibold">
									{name || "Tất cả"}
								</p>
							</div>
						</Button>
					)
				)}
			</div>
			<Button
				variant="flat"
				color="danger"
				className={twMerge(" flex-1 h-fit")}
				onClick={() => {
					setUrlQuery(pathname, {
						criteria_id: "",
						semester_id: "",
						faculty_id: "",
						subjects: undefined,
						lecturer_id: "",
						class_id: "",
					});
				}}
			>
				<div className=" p-2 flex-col gap-2 items-start">
					<p className=" font-semibold text-xs text-start">
						Xóa tất cả lựa chọn
					</p>
				</div>
			</Button>
		</div>
	);
}
