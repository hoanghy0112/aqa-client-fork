import { getSemesterList } from "@/api/semester";
import ClientProvider from "@/components/ClientProvider";
import { GET_LECTURER_CLASSES } from "@/constants/api_endpoint";
import { FilterProvider } from "@/contexts/FilterContext";
import withQuery from "@/utils/withQuery";
import { Accordion, AccordionItem } from "@nextui-org/react";

async function SemesterClass({
	semester_id,
	lecturer_id,
}: {
	semester_id: string;
	lecturer_id: string;
}) {
	const classesData = (await fetch(
		withQuery(GET_LECTURER_CLASSES(lecturer_id), { semester_id })
	)) as unknown as { meta: any; data: IClass[] };
	return (
		<>
			{classesData.data.map(({ class_id, class_name }) => (
				<div key={class_id}>{class_name}</div>
			))}
		</>
	);
}

export default async function Page({
	params: { lecturer_id },
}: {
	params: { lecturer_id: string };
}) {
	const semesters = await getSemesterList(lecturer_id);

	return (
		<ClientProvider>
			<FilterProvider>
				<Accordion variant="splitted">
					{semesters.map(({ semester_id, semester_name }) => (
						<AccordionItem
							key={semester_id}
							aria-label={semester_name}
							title={semester_name}
						>
							<SemesterClass
								semester_id={semester_id}
								lecturer_id={lecturer_id}
							/>
						</AccordionItem>
					))}
				</Accordion>
			</FilterProvider>
		</ClientProvider>
	);
}
