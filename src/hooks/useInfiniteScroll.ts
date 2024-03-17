import { PaginatedMetaData } from "@/gql/graphql";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { useDeepCompareEffect } from "react-use";

export function useInfiniteScroll<T>({
	queryFunction,
	variables,
	isLoading,
	data,
	meta,
	enabled,
}: {
	queryFunction: (options: { variables: Record<string, any> }) => any;
	variables: Record<string, any>;
	isLoading: boolean;
	data?: T[];
	meta?: PaginatedMetaData;
	enabled?: boolean;
}) {
	const bottomRef = useRef<HTMLDivElement>(null);
	const [dataList, setDataList] = useState<T[]>([]);
	const isQuerying = useRef(false);

	useDeepCompareEffect(() => {
		isQuerying.current = true;
		queryFunction({ variables: { page: 0, ...variables } });
		setDataList([]);
	}, [variables, enabled]);

	useEffect(() => {
		if (bottomRef.current && dataList.length) {
			const observer = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					if (meta?.hasNext && isQuerying.current == false && !isLoading) {
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
	}, [dataList, enabled]);

	useDeepCompareEffect(() => {
		if (!isLoading && data) {
			if (meta?.page === 0) setDataList(data || []);
			else setDataList((prev) => [...prev, ...(data || [])]);
		}
	}, [isLoading, data, enabled]);

	useDeepCompareEffect(() => {
		if (meta) {
			isQuerying.current = false;
		}
	}, [meta, enabled]);

	return { dataList, bottomRef };
}
