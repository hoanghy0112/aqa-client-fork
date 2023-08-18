"use client";
import { useFilter } from "@/contexts/FilterContext";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";

export function SortSelector() {
	const { sort, setSort } = useFilter();

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="bordered" className="">
					{sort == "asc"
						? "Tăng dần"
						: sort == "desc"
						? "Giảm dần"
						: "Chọn cách sắp xếp"}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Single selection actions"
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={new Set([sort || ""])}
				onSelectionChange={(e: any) => setSort(e.currentKey)}
			>
				<DropdownItem key="asc">Tăng dần</DropdownItem>
				<DropdownItem key="desc">Giảm dần</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
