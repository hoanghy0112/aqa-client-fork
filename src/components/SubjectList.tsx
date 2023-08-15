"use client";

import { GET_SUBJECT_TABLE } from "@/constants/api_endpoint";
import useIncrementalFetch from "@/hooks/useIncrementalFetch";
import {
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	getKeyValue,
} from "@nextui-org/react";

export default function SubjectList({
	semester,
	keyword,
}: {
	semester: Semester | undefined;
	keyword: string;
}) {
	const { items, isLoading, bottomRef } = useIncrementalFetch<ISubjectItem>({
		url: GET_SUBJECT_TABLE,
		query: {
			semester_id: semester?.semester_id,
			keyword,
		},
	});

	return (
		<>
			<div className="w-[800px]"></div>
			{items.length > 0 ? (
				<Table
					isStriped
					aria-label="Subject table"
					className="mt-10"
					bottomContent={
						isLoading ? (
							<div
								ref={bottomRef}
								className=" w-full py-4 flex flex-row justify-center gap-2 items-center"
							>
								<Spinner size="sm" />
								<p className=" text-md font-semibold"> Đang tải...</p>
							</div>
						) : (
							<div
								ref={bottomRef}
								className=" w-full py-4 flex flex-row justify-center gap-2 items-center"
							>
								<p className=" text-md font-semibold">
									Không còn môn học nào
								</p>
							</div>
						)
					}
				>
					<TableHeader
						columns={[
							...columns,
							...items[0].points.map((v) => ({
								key: v.criteria_id,
								index: v.index,
								label: v.criteria_name,
							})),
						]}
					>
						{(column) => (
							<TableColumn id={column.key} key={column.key}>
								<div
									className={`${
										column.key == "subject_name" && " w-[500px]"
									}`}
								>
									{column.index ? (
										<Tooltip
											content={
												<p className=" max-w-xs">{column.label}</p>
											}
										>
											<p className="">{`Tiêu chí ${column.index}`}</p>
										</Tooltip>
									) : (
										column.label
									)}
								</div>
							</TableColumn>
						)}
					</TableHeader>
					<TableBody
						items={items.map((v) => ({
							...v,
							...Object.fromEntries(
								v.points.map((p) => [
									p.criteria_id,
									<p
										key={p.criteria_id}
										className=" font-semibold text-md"
									>{`${Math.floor(p.point * 100)}%`}</p>,
								])
							),
						}))}
					>
						{(item) => (
							<TableRow key={item.subject_id}>
								{(columnKey) => (
									<TableCell>
										<div className="py-3">
											{getKeyValue(item, columnKey)}
										</div>
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			) : null}
		</>
	);
}

const columns: { key: string; label: string; index?: number }[] = [
	{
		key: "subject_name",
		label: "Tên môn học",
	},
	{
		key: "faculty_name",
		label: "Tên khoa",
	},
];

interface ISubjectItem {
	average_point: number;
	faculty_id: string;
	faculty_name: string;
	subject_id: string;
	subject_name: string;
	points: {
		criteria_id: string;
		criteria_name: string;
		index: number;
		max_point: number;
		point: number;
	}[];
}
