import { useState, useEffect } from "react";

export default function usePersistentState<T>(
	name: string,
	defaultValue: T | undefined
) {
	const value = localStorage.getItem(name);

	const [data, setData] = useState(
		value != null ? JSON.parse(value) : defaultValue
	);

	useEffect(() => {
		if (data) localStorage.setItem(name, JSON.stringify(data));
	}, [data, name]);

	return [data, setData];
}
