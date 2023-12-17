"use client";

import TextLink from "@/components/TextLink";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";

type IProps = {
	className?: string;
} & Partial<IClass>;

export default function ClassDetail({
	className,
	faculty_id,
	faculty_name,
	subject_id,
	subject_name,
	semester_name,
	attend,
	total,
	class_type,
}: IProps) {
	return (
		<div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
			<Table
				hideHeader
				color="default"
				className={className}
				aria-label="Class information"
			>
				<TableHeader>
					<TableColumn>Tên</TableColumn>
					<TableColumn>Giá trị</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Môn</TableCell>
						<TableCell>
							<TextLink href={`/faculty/${subject_id}`}>
								{subject_name}
							</TextLink>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Khoa</TableCell>
						<TableCell>
							<TextLink href={`/faculty/${faculty_id}`}>
								{faculty_name}
							</TextLink>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Học kỳ</TableCell>
						<TableCell>
							<p className=" font-medium">{semester_name}</p>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<Table
				hideHeader
				color="default"
				className={className}
				aria-label="Class information"
			>
				<TableHeader>
					<TableColumn>Tên</TableColumn>
					<TableColumn>Giá trị</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Tham gia</TableCell>
						<TableCell>
							<p className=" font-medium text-zinc-500 dark:text-zinc-400">
								{attend}
							</p>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Tổng số học sinh</TableCell>
						<TableCell>
							<p className=" font-medium">{total}</p>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Loại lớp</TableCell>
						<TableCell>{class_type}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
