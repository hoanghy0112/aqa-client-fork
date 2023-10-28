import { redirect } from "next/navigation";

export default function Page({
	params: { subject_id },
}: {
	params: { subject_id: string };
}) {
	redirect(`/subject/${subject_id}/points`);
}
