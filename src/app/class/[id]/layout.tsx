import BreadCrumb from "@/components/BreadCrumb";
import PointTable from "@/components/PointTable";
import TextLink from "@/components/TextLink";
import { GET_CLASS_INFORMATION } from "@/constants/api_endpoint";
import { ReactNode } from "react";
import ClassDetail from "./ClassDetail";
import PageTabs from "@/components/PageTabs";

export default async function DetailClassPage({
	params,
	children,
}: {
	params: { id: string };
	children: ReactNode;
}) {
	const response = await fetch(GET_CLASS_INFORMATION(params.id));
	const classInfo: ClassInfo = await response.json();

	return (
		<div>
			<h1 className="font-semibold text-2xl">
				{classInfo.class_name} - {classInfo.subject_name}
			</h1>
			<h2 className="mt-3 text-gray-600 dark:text-gray-300">
				Giảng viên{" "}
				<TextLink href={`/lecturer/${classInfo.lecturer_id}`}>
					{classInfo.lecturer_id}
				</TextLink>
			</h2>
			<BreadCrumb />
			<PageTabs
				lastIndex={3}
				defaultPath={`class/${params.id}`}
				tabs={[
					{
						link: "",
						title: "Trang chủ",
					},
					{
						link: "comment",
						title: "Bình luận",
					},
				]}
			/>
			<div className=" mt-10">{children}</div>
		</div>
	);
}

type ClassInfo = {
	class_id: string;
	class_name: string;
	class_type: string;
	program: string;
	subject_id: string;
	subject_name: string;
	lecturer_id: string;
	lecturer_name: string;
	// total: number;
	// attend: number;
	semester_id: string;
	semester_name: string;
	points: {
		point: number;
		max_point: number;
		criteria_id: string;
		criteria_name: string;
	}[];
};
