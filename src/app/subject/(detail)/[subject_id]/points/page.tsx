export default function Page({
	params: { subject_id },
}: {
	params: { subject_id: string };
}) {
	return <div>{subject_id}</div>;
}
