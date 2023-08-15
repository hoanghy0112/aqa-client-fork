export default function withQuery(url: string, queries: object): string {
	const queryString = Object.entries(queries)
		.filter(([key, value]) => value)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
	return `${url}?${queryString}`;
}
