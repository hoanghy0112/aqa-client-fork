"use client";

import { CommentContext } from "@/app/comment/provider";
import { GET_PROGRAM_LIST } from "@/constants/api_endpoint";
import { ProgramContext } from "@/contexts/ProgramContext";
import { defaultFetcher } from "@/utils/fetchers";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Spinner,
} from "@nextui-org/react";
import { useContext, useState } from "react";
import useSWR from "swr";

export default function ProgramSelector({
	program,
	setProgram,
}: {
	program?: string;
	setProgram?: (d: string) => any;
}) {
	const { data, isLoading } = useSWR<string[]>(
		GET_PROGRAM_LIST,
		defaultFetcher
	);

	return (
		<Dropdown backdrop="blur" shouldBlockScroll={false}>
			<DropdownTrigger>
				<Button variant="bordered" className="w-fit">
					<p className="font-medium w-fit">
						{program || "Chọn chương trình"}
					</p>
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				variant="faded"
				aria-label="Program dropdown"
				selectionMode="single"
				selectedKeys={new Set([program || ""])}
				onAction={(key) => setProgram?.(key as string)}
			>
				<DropdownSection title="Chọn học kỳ">
					{data && !isLoading ? (
						data.map((programTitle) => (
							<DropdownItem className={`py-2`} key={programTitle}>
								<p className="font-medium"> {programTitle}</p>
							</DropdownItem>
						))
					) : (
						<div className=" flex flex-row gap-3">
							<Spinner size="sm" />
							<p className=" text-sm font-medium">Đang tải</p>
						</div>
					)}
				</DropdownSection>
				<DropdownSection title={"Khác"}>
					<DropdownItem className={`py-2`} key={""}>
						<p className="font-medium">Tất cả</p>
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
}
