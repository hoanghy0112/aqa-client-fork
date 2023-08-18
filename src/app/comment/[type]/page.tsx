import CommentList from "@/components/comments/CommentList";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return [{ type: "all" }, { type: "positive" }, { type: "negative" }];
}

export default function Page({
	params: { type },
}: {
	params: { type: "all" | "positive" | "negative" };
}) {
	if (!["all", "positive", "negative"].includes(type)) notFound();

	return <CommentList type={type} />;
}
