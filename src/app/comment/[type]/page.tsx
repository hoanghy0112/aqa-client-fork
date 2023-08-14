import getComments from "@/api/comment";

export function generateStaticParams() {
	return [{ type: "all" }, { type: "positive" }, { type: "negative" }];
}

export default async function Page({
	params: { type },
}: {
	params: { type: string };
}) {
	const comments = await getComments({ page: 0 });
	console.log({ comments });

	return <div>{type}</div>;
}
