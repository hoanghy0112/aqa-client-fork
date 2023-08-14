import { GET_SEMESTER_LIST } from "@/constants/api_endpoint";

export async function getSemesterList() {
	const res = await fetch(GET_SEMESTER_LIST);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}
