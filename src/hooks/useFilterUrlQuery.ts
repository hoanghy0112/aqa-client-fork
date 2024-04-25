import { FilterArgs } from "@/gql/graphql";
import withQuery from "@/utils/withQuery";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import usePersistentState from "./usePersistentState";

export function useFilterUrlQuery() {
	const router = useRouter();
	const params = useSearchParams();

	const [query, setQuery] = useState<FilterArgs>({
		criteria_id: "",
		semester_id: "",
		faculty_id: "",
		subjects: undefined,
		lecturer_id: "",
		program: "",
		class_type: "",
		class_id: "",
	});

	const setUrlQuery = useCallback(
		(pathname: string, newQuery: Partial<FilterArgs>) => {
			// setQuery({ ...query, ...newQuery });
			router.push(
				withQuery(pathname, {
					...Object.fromEntries(params.entries()),
					tree: encodeURI(JSON.stringify({ ...query, ...newQuery })),
				})
			);
		},
		[query]
	);

	useEffect(() => {
		if (params.has("tree"))
			setQuery(JSON.parse(decodeURI(params.get("tree")?.toString() || "")));
	}, []);

	return { query, setUrlQuery };
}
