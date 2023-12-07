"use client";

import ProgramIcon from "@/assets/ProgramIcon";
import { GET_PROGRAM_LIST } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import useNavigate from "@/hooks/useNavigate";
import { defaultFetcher } from "@/utils/fetchers";
import { Button } from "@nextui-org/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

function ProgramSelector_({
	program,
	setProgram,
	isNoBorder = false,
}: {
	program?: string;
	setProgram?: (d: string) => any;
} & ProgramSelectorPropTypes) {
	const { data, isLoading } = useSWR<string[]>(GET_PROGRAM_LIST, defaultFetcher);

	const hasValue = Boolean(program);
	const buttonText = program || "Chương trình";

	return (
		<Dropdown backdrop="blur" shouldBlockScroll={false}>
			<DropdownTrigger>
				<Button
					variant={hasValue ? "shadow" : "ghost"}
					color={hasValue ? "primary" : "default"}
					startContent={
						<ProgramIcon
							color={hasValue ? "white" : undefined}
							width={20}
						/>
					}
					className={`${
						hasValue
							? ""
							: isNoBorder
							? " bg-white border-0 hover:!bg-zinc-100"
							: " border-0 bg-slate-100 hover:!bg-slate-200"
					} rounded-lg`}
				>
					{buttonText}
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

export default function ProgramSelector(props: ProgramSelectorPropTypes) {
	const { program, setProgram } = useFilter();

	return <ProgramSelector_ program={program} setProgram={setProgram} {...props} />;
}

export function ProgramSelectorWithSearchParam(props: ProgramSelectorPropTypes) {
	const searchParams = useSearchParams();
	const navigate = useNavigate();

	const program = useMemo(
		() => searchParams.get("program") || undefined,
		[searchParams]
	);

	const setProgram = useCallback(
		(program: string) => navigate.replace({ program }),
		[navigate]
	);

	return <ProgramSelector_ program={program} setProgram={setProgram} {...props} />;
}

type ProgramSelectorPropTypes = {
	isNoBorder?: boolean;
};
