"use client";

import { GET_LECTURER_CLASSES, GET_SEMESTER_LIST } from "@/constants/api_endpoint";
import { FilterProvider } from "@/contexts/FilterContext";
import withQuery from "@/utils/withQuery";
import Loading from "@components/Loading";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import React from "react";
import useSWR from "swr";

import { useRouter } from "next/navigation";

async function SemesterClass({
	semester_id,
	lecturer_id,
	onPress,
}: {
	semester_id: string;
	lecturer_id: string;
	onPress: (id: string) => any;
}) {
	const classesRes = await fetch(
		withQuery(GET_LECTURER_CLASSES(lecturer_id), { semester_id }),
		{ cache: "force-cache" }
	);

	console.log({ classesRes });

	const classesData = (await classesRes.json()) as unknown as {
		meta: any;
		data: IClass[];
	};

	return (
		<div className=" flex flex-wrap gap-2 pb-2">
			{classesData.data.length ? (
				classesData.data.map(({ class_id, class_name }) => (
					<Button
						className=" bg-gray-200 dark:bg-zinc-800"
						key={class_id}
						onPress={() => onPress(class_id)}
					>
						{class_name}
					</Button>
				))
			) : (
				<p className=" font-medium text-slate-800">Không có dữ liệu</p>
			)}
		</div>
	);
}

export default function Page({
	params: { lecturer_id },
}: {
	params: { lecturer_id: string };
}) {
	const router = useRouter();

	const { data: semesters, isLoading } = useSWR<Semester[]>(
		withQuery(GET_SEMESTER_LIST, { lecturer_id }),
		(url) =>
			fetch(url).then((res) => {
				console.log({ res });
				return res.json();
			})
	);

	return (
		<FilterProvider>
			{isLoading ? (
				<Loading />
			) : (
				<Accordion variant="splitted" selectionMode="multiple" isCompact>
					{semesters?.map(({ semester_id, semester_name }) => (
						<AccordionItem
							key={semester_id}
							aria-label={semester_name}
							title={
								<p className="py-1 font-medium">{semester_name}</p>
							}
						>
							<React.Suspense
								fallback={
									<div className=" pb-4">
										<Loading />
									</div>
								}
							>
								<SemesterClass
									semester_id={semester_id}
									lecturer_id={lecturer_id}
									onPress={(class_id) =>
										router.push(`/class/${class_id}`)
									}
								/>
							</React.Suspense>
						</AccordionItem>
					)) || <></>}
				</Accordion>
			)}
		</FilterProvider>
	);
}
