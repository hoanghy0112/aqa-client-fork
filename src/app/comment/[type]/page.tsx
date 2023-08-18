import CommentList from "@/components/comments/CommentList";
import { notFound } from "next/navigation";

export default function Page({
	params: { type },
}: {
	params: { type: "all" | "positive" | "negative" };
}) {
	if (!["all", "positive", "negative"].includes(type)) notFound();

	return <CommentList type={type} />;
}
