import { useState, useEffect } from "react";

export default function usePersistentState<T>(
	name: string,
	defaultValue: T | undefined
) {
	const [data, setData] = useState(null);

	useEffect(() => {
		const value = localStorage.getItem(name);
		setData(value != null ? JSON.parse(value) : defaultValue);
	}, []);

	useEffect(() => {
		if (data) localStorage.setItem(name, JSON.stringify(data));
	}, [data, name]);

	return [data === null ? defaultValue : data, setData];
}
