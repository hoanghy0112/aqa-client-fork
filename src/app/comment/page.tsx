import { redirect } from "next/navigation";

export default function CommentPage() {
	redirect("/comment/all");

	return <div></div>;
}
