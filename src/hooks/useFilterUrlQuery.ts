import { FilterArgs } from "@/gql/graphql";
import withQuery from "@/utils/withQuery";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import usePersistentState from "./usePersistentState";

export function useFilterUrlQuery() {
	const router = useRouter();
	const params = useParams();

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
					...params,
					tree: encodeURI(JSON.stringify({ ...query, ...newQuery })),
				})
			);
		},
		[query]
	);

	useEffect(() => {
		if (params.tree) setQuery(JSON.parse(decodeURI(params.tree.toString())));
	}, []);

	return { query, setUrlQuery };
}
