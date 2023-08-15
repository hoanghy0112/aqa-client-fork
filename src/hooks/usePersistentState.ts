import { useState, useEffect } from "react";

export default function usePersistentState<T>(
	name: string,
	defaultValue: T | undefined
): [T | undefined, (data: T) => void] {
	const [data, setData] = useState<T | undefined>(undefined);

	useEffect(() => {
		const value = localStorage.getItem(name);
		setData(value != null ? JSON.parse(value) : defaultValue);
	}, []);

	useEffect(() => {
		if (data) localStorage.setItem(name, JSON.stringify(data));
	}, [data, name]);

	return [data === undefined ? defaultValue : data, setData];
}
