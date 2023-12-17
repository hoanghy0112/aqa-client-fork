"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/react";

interface IProps {
	data: IPoint[];
}

export default function PointTable({ data }: IProps) {
	return (
		<Table
			removeWrapper
			isStriped
			color="default"
			selectionMode="single"
			aria-label="Point table"
		>
			<TableHeader>
				<TableColumn>STT</TableColumn>
				<TableColumn key="criteria_name">Tiêu chí</TableColumn>
				<TableColumn key="point">Điểm</TableColumn>
			</TableHeader>
			<TableBody items={data}>
				{data.map((point, index) => (
					<TableRow key={point.criteria_id}>
						<TableCell>{index + 1}</TableCell>
						<TableCell>{point.criteria_name}</TableCell>
						<TableCell>{point.point}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
