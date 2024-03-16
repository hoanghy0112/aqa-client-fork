import { useRef } from "react";

export function useRememberValue<T>(data: T | undefined): T {
	const oldData = useRef<T>();

	if (data) {
		oldData.current = data;
	}

	return oldData.current as T;
}
