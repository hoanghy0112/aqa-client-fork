import { ReactNode } from "react";

export default async function SubjectLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<>
			<h1 className="font-semibold text-3xl">Môn học</h1>
		</>
	);
}
