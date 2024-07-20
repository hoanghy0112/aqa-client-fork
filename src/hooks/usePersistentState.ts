import { useState, useEffect, SetStateAction, Dispatch } from "react";

export default function usePersistentState<T>(
	name: string,
	defaultValue?: T
): [T, Dispatch<SetStateAction<T>>] {
	const [data, setData] = useState<T>(
		JSON.parse(localStorage.getItem(name) || JSON.stringify(defaultValue))
	);

	useEffect(() => {
		const value = localStorage.getItem(name);
		setData(value != null ? JSON.parse(value) : defaultValue);
	}, [defaultValue, name]);

	useEffect(() => {
		if (data) localStorage.setItem(name, JSON.stringify(data));
	}, [data, name]);

	return [data, setData];
}

export function usePersistentCookieState<T>(
	name: string,
	defaultValue?: T
): [T, Dispatch<SetStateAction<T>>] {
	const [data, setData] = useState<T>(
		JSON.parse(localStorage.getItem(name) || JSON.stringify(defaultValue))
	);

	useEffect(() => {
		const value = localStorage.getItem(name);
		setData(value != null ? JSON.parse(value) : defaultValue);
	}, [defaultValue, name]);

	useEffect(() => {
		if (data) localStorage.setItem(name, JSON.stringify(data));
	}, [data, name]);

	return [data, setData];
}
