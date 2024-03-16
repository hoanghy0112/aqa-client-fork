import { PaginatedMetaData } from "@/gql/graphql";
import { useEffect, useRef, useState } from "react";
import { useDeepCompareEffect } from "react-use";

export function useInfiniteScroll<T>(deps: any[]) {
	const bottomRef = useRef<HTMLDivElement>(null);
	const [meta, setMeta] = useState<PaginatedMetaData>();
	const [page, setPage] = useState(0);
	const [data, setData] = useState<T[]>([]);

	if (bottomRef.current) {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				if (meta?.hasNext) setPage((prev) => prev + 1);
				observer.unobserve(entry.target);
			}
		});

		observer.observe(bottomRef.current);
	}

	useEffect(() => {
		setPage(0);
		setData([]);
		setMeta(undefined);
	}, deps);

	return {
		data,
		setData: ({
			data: newData,
			meta,
		}: {
			data: T[];
			meta: PaginatedMetaData;
		}) => {
			setMeta(meta);
			setData((prev) => [...prev, ...newData]);
		},
		page,
		bottomRef,
	};
}
