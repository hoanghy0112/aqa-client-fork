/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
	GET_LECTURER_WITH_POINTS,
	GET_SUBJECT_TABLE,
} from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import useIncrementalFetch from "@/hooks/useIncrementalFetch";
import {
	SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Loading from "../Loading";
import TableSketon from "../TableSkeleton";
import { useRouter } from "next/navigation";

export default function LecturerList() {
	const router = useRouter();

	const { semester, keyword, program, faculty } = useFilter();
	const [columns, setColumns] = useState(defaultColumns);
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "lecturer_name",
		direction: "ascending",
	});

	const { items, isLoading, bottomRef } = useIncrementalFetch<ISubjectItem>({
		url: GET_LECTURER_WITH_POINTS,
		query: {
			semester_id: semester?.semester_id,
			q: keyword,
			program,
			faculty_name: faculty?.faculty_name,
			page_size: 20,
			filter_field: sortDescriptor.column,
			direction: sortDescriptor.direction === "ascending" ? "asc" : "desc",
		},
	});

	useEffect(() => {
		const item = items.find((a) => a.points.length > 0);
		if (items.length > 0)
			setColumns([
				...defaultColumns,
				...(item?.points.map((v) => ({
					key: v.criteria_id,
					index: v.index,
					label: v.criteria_name,
				})) || []),
			]);
	}, [items.length]);

	const onSortChange = useCallback((e: SortDescriptor) => {
		setSortDescriptor(e);
	}, []);

	return (
		<div className="pt-10">
			{columns.length > 2 || !isLoading ? (
				<Table
					isStriped
					isHeaderSticky
					selectionMode="single"
					aria-label="Subject table"
					sortDescriptor={sortDescriptor}
					onSortChange={onSortChange}
					className=" max-h-[90vh] "
					bottomContent={
						isLoading || !items ? (
							<div>
								<Loading ref={bottomRef} />
							</div>
						) : (
							<div
								ref={bottomRef}
								className=" w-full py-4 flex flex-row justify-center gap-2 items-center"
							/>
						)
					}
				>
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn
								id={column.key}
								key={column.key}
								allowsSorting
							>
								<div
									className={`min-w-fit inline-block ${
										column.key == "lecturer_name" && " w-[500px]"
									}`}
								>
									{column.index ? (
										<Tooltip
											content={
												<p className=" max-w-xs">
													{column.label}
												</p>
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
							<TableRow
								key={item.lecturer_id}
								onClick={() =>
									router.push(`/lecturer/${item.lecturer_id}`)
								}
							>
								{(columnKey) => {
									if (columnKey === "lecturer_name") {
										return (
											<TableCell>
												<Link
													href={`/subject/${item.lecturer_id}`}
													className="py-3"
												>
													{getKeyValue(item, columnKey)}
												</Link>
											</TableCell>
										);
									}
									return (
										<TableCell>
											<div className="py-3">
												{getKeyValue(item, columnKey)}
											</div>
										</TableCell>
									);
								}}
							</TableRow>
						)}
					</TableBody>
				</Table>
			) : (
				<TableSketon lines={6} />
			)}
		</div>
	);
}

const defaultColumns: { key: string; label: string; index?: number }[] = [
	{
		key: "lecturer_name",
		label: "Tên giảng viên",
	},
	{
		key: "faculty_name",
		label: "Tên khoa",
	},
];

interface ISubjectItem {
	average_point: number;
	lecturer_id: string;
	lecturer_name: string;
	faculty_id: string;
	faculty_name: string;
	points: {
		criteria_id: string;
		criteria_name: string;
		index: number;
		max_point: number;
		point: number;
	}[];
}
