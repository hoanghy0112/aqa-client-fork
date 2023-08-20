export default function SubjectDetailPage({
	params,
}: {
	params: { subject_id: string };
}) {
	return <p>Id: {params.subject_id}</p>;
}
