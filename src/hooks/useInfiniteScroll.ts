import { PaginatedMetaData } from "@/gql/graphql";
import { useEffect, useRef, useState } from "react";
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

	useDeepCompareEffect(() => {
		queryFunction({ variables });
		setDataList([]);
	}, [variables]);

	if (bottomRef.current) {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				if (meta?.hasNext) {
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
		if (!isLoading) {
			setDataList((prev) => [...prev, ...(data || [])]);
		}
	}, [isLoading, data]);

	return { dataList, bottomRef };
}
