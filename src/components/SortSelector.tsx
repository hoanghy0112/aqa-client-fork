"use client";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";

export function SortSelector({
	selectedKeys,
	setSelectedKeys,
}: {
	selectedKeys: Set<string>;
	setSelectedKeys: (d: Set<string>) => void;
}) {
	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="bordered" className="">
					{selectedKeys.has("asc")
						? "Tăng dần"
						: selectedKeys.has("desc")
						? "Giảm dần"
						: "Chọn cách sắp xếp"}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Single selection actions"
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={selectedKeys}
				onSelectionChange={(e: any) =>
					setSelectedKeys(new Set([e.currentKey]))
				}
			>
				<DropdownItem key="asc">Tăng dần</DropdownItem>
				<DropdownItem key="desc">Giảm dần</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
