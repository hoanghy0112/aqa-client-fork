import PointTable from "@/components/PointTable";
import TextLink from "@/components/TextLink";
import { GET_CLASS_INFORMATION } from "@/constants/api_endpoint";
import Link from "next/link";
import ClassDetail from "./ClassDetail";

export default async function DetailClassPage({
	params,
}: {
	params: { id: string };
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
					{classInfo.lecturer_name}
				</TextLink>
			</h2>
			<ClassDetail className="mt-10" {...classInfo} />
			<div className=" grid grid-cols-1 3xl:grid-cols-2 mt-10">
				<PointTable data={classInfo.points || []} />
			</div>
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
