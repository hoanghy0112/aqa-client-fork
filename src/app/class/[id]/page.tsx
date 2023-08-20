export default function DetailClassPage({ params }: { params: { id: string } }) {
	return <p>Id: {params.id}</p>;
}
