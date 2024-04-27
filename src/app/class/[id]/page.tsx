import PointTable from "@/components/PointTable";
import { GET_CLASS_INFORMATION } from "@/constants/api_endpoint";
import ClassDetail from "./ClassDetail";

export default async function Page({ params }: { params: { id: string } }) {
	const response = await fetch(GET_CLASS_INFORMATION(params.id));
	const classInfo: ClassInfo = await response.json();

	return (
		<div>
			<ClassDetail className="" {...classInfo} />
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
