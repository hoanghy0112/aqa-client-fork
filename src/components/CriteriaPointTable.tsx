import {
	Link,
	SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	getKeyValue,
} from "@nextui-org/react";
import TableSketon from "@/components/TableSkeleton";
import { Key } from "react";

type Props = {
	sortDescriptor: SortDescriptor;
	setSortDescriptor: (d: SortDescriptor) => any;
	columns: { key: string; label: string; index?: number; width?: number }[];
	items: ({
		id: string;
		points: {
			criteria_id: string;
			criteria_name: string;
			index: number;
			point: number;
		}[];
	} & { [key: string]: any })[];
	itemHref: string;
	key_name: string;
};

export default function CriteriaPointTable({
	sortDescriptor,
	setSortDescriptor,
	columns,
	items,
	itemHref,
	key_name,
}: Props) {
	return (
		<>
			<Table
				isStriped
				aria-label="Subject table"
				sortDescriptor={sortDescriptor}
				onSortChange={(e) => setSortDescriptor(e)}
				bottomContent={
					<div className=" w-full py-4 flex flex-row justify-center gap-2 items-center" />
				}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn id={column.key} key={column.key} allowsSorting>
							<div
								className={`min-w-fit inline-block`}
								style={{ width: column.width || "max-content" }}
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
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>
									<Link
										href={
											columnKey === key_name
												? `${itemHref}/${item.id}`
												: `${itemHref}\#${columnKey}`
										}
										className="py-3 hover:underline text-black dark:text-white"
									>
										{getKeyValue(item, columnKey)}
									</Link>
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
}
