"use client";

import { GET_PROGRAM_LIST } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
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
import useSWR from "swr";

export default function ProgramSelector() {
	const { program, setProgram } = useFilter();

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
				<DropdownSection title="Chọn chương trình">
					{data && !isLoading ? (
						data.map((programTitle) => (
							<DropdownItem
								onPress={() => setProgram?.(programTitle)}
								className={`py-2`}
								key={programTitle}
							>
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
					<DropdownItem
						onPress={() => setProgram?.("")}
						className={`py-2`}
						key={""}
					>
						<p className="font-medium">Tất cả</p>
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
}
