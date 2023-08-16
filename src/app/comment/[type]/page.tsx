import CommentList from "@/components/CommentList";

export function generateStaticParams() {
	return [{ type: "all" }, { type: "positive" }, { type: "negative" }];
}

export default async function Page({
	params: { type },
}: {
	params: { type: "all" | "positive" | "negative" };
}) {
	return <CommentList type={type} />;
}
