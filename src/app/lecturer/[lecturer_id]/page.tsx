import { redirect } from "next/navigation";

export default function Page({
	params: { lecturer_id },
}: {
	params: { lecturer_id: string };
}) {
	redirect(`/lecturer/${lecturer_id}/points`);
}
