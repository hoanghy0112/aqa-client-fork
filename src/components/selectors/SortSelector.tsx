"use client";
import { useFilter } from "@/contexts/FilterContext";
import { Button } from "@nextui-org/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown";
import { useEffect } from "react";
import OptionButton from "../OptionButton";

export function SortSelector({ defaultValue }: { defaultValue?: ISortOptions }) {
	const { sort, setSort } = useFilter();

	const buttonText =
		sort == "asc" ? "Tăng dần" : sort == "desc" ? "Giảm dần" : "Chọn thứ tự";
	const hasValue = Boolean(sort == "asc" || sort == "desc");

	useEffect(() => {
		if (defaultValue != undefined) setSort(defaultValue);
	}, [defaultValue, setSort]);

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button
					variant={hasValue ? "shadow" : "ghost"}
					color={hasValue ? "primary" : "default"}
				>
					{buttonText}
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
				<DropdownItem key="">Chọn thứ tự</DropdownItem>
				<DropdownItem key="asc">Tăng dần</DropdownItem>
				<DropdownItem key="desc">Giảm dần</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
