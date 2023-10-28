import PageTabs from "@/components/PageTabs";
import { GET_SUBJECT_INFO } from "@/constants/api_endpoint";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Layout({
	params: { subject_id },
	children,
}: {
	params: { subject_id: string };
	children: ReactNode;
}) {
	const res = await fetch(`${GET_SUBJECT_INFO}/${subject_id}`);
	const { faculty_id, faculty_name, subject_name }: ISubjectInfo =
		await res.json();

	return (
		<div>
			<h1 className="font-semibold text-2xl">{subject_name}</h1>
			<h2 className="mt-2 text-gray-600 dark:text-gray-300">
				Khoa{" "}
				<Link href={`/faculty/${faculty_id}`}>
					<span className=" underline hover:text-sky-600 hover:dark:text-sky-500">
						{faculty_name}
					</span>
				</Link>
			</h2>
			<PageTabs defaultPath={`/subject/${subject_id}`} tabs={tabs} />
			<div className="mt-4"> {children}</div>
		</div>
	);
}

export const tabs = [
	{
		link: "points",
		title: "Điểm các lớp",
	},
	{
		link: "lecturers",
		title: "Điểm các giảng viên",
	},
	{
		link: "comments",
		title: "Bình luận",
	},
];

interface ISubjectInfo {
	subject_id: string;
	subject_name: string;
	faculty_id: string;
	faculty_name: string;
}

export async function generateMetadata({
	params: { subject_id },
}: {
	params: { subject_id: string };
}) {
	const res = await fetch(`${GET_SUBJECT_INFO}/${subject_id}`);
	const { subject_name }: ISubjectInfo = await res.json();

	return {
		title: `${subject_name} - AQA`,
	};
}
