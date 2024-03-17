import { useRef } from "react";

export function useRememberValue<T>(data: T | undefined) {
	const oldData = useRef<T>();

	if (data) {
		oldData.current = data;
	}

	return oldData.current;
}
