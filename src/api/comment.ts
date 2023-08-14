import { GET_COMMENT_LIST } from "@/constants/api_endpoint";
import { PAGE_SIZE } from "@/constants/fetch_config";

export default async function getComments({
	page,
	type,
	q,
	page_size = PAGE_SIZE,
}: {
	page: number;
	type?: string;
	q?: string;
	page_size?: number;
}) {
	const res = await fetch(
		`${GET_COMMENT_LIST}?${type && type !== "all" ? `type=${type}&` : ""}${
			q ? `q=${q}` : ""
		}page=${page}&page_size=${page_size}`
	);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}
