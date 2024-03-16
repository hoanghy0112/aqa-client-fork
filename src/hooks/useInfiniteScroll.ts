import { PaginatedMetaData } from "@/gql/graphql";
import _ from "lodash";
import { useRef, useState } from "react";
import { useDeepCompareEffect } from "react-use";

export function useInfiniteScroll<T>({
	queryFunction,
	variables,
	isLoading,
	data,
	meta,
}: {
	queryFunction: (options: { variables: Record<string, any> }) => any;
	variables: Record<string, any>;
	isLoading: boolean;
	data?: T[];
	meta?: PaginatedMetaData;
}) {
	const bottomRef = useRef<HTMLDivElement>(null);
	const [dataList, setDataList] = useState<T[]>([]);
	const isQuerying = useRef(false);

	useDeepCompareEffect(() => {
		isQuerying.current = true;
		queryFunction({ variables: { page: 0, ...variables } });
		setDataList([]);
	}, [variables]);

	if (bottomRef.current && dataList.length && !isLoading) {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				if (meta?.hasNext && isQuerying.current == false) {
					isQuerying.current = true;
					queryFunction({
						variables: { page: meta.page + 1, ...variables },
					});
				}
				observer.unobserve(entry.target);
			}
		});

		observer.observe(bottomRef.current);
	}

	useDeepCompareEffect(() => {
		if (!isLoading && data) {
			isQuerying.current = false;
			if (meta?.page === 0) setDataList(data || []);
			else setDataList((prev) => [...prev, ...(data || [])]);
		}
	}, [isLoading, data]);

	return { dataList, bottomRef };
}
