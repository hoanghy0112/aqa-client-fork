"use client";

import { GET_FACULTY_LIST } from "@/constants/api_endpoint";
import { FacultyContext } from "@/contexts/FacultyContext";
import { defaultFetcher } from "@/utils/fetchers";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Spinner,
	useDisclosure,
} from "@nextui-org/react";
import { useContext, useEffect, useRef } from "react";
import useSWR from "swr";

export default function FacultySelector({
	faculty,
	setFaculty,
}: {
	faculty?: string;
	setFaculty?: (d: string) => any;
}) {
	const {} = useContext(FacultyContext);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { data, isLoading } = useSWR<Faculty[]>(
		GET_FACULTY_LIST,
		defaultFetcher
	);

	const currentSelectedRef = useRef<any>();

	useEffect(() => {
		if (currentSelectedRef.current) {
			currentSelectedRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [currentSelectedRef.current]);

	return (
		<>
			<Button onPress={onOpen} variant="bordered" className="w-fit">
				<p className="font-medium w-fit">{faculty || "Chọn khoa"}</p>
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior="inside"
				backdrop="blur"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>
								<p>Chọn khoa</p>
							</ModalHeader>
							<ModalBody className="pb-8 pt-3">
								<Button
									onPress={() => {
										setFaculty?.("" as string);
										onClose();
									}}
									variant={"" == faculty ? "shadow" : "flat"}
									color={"" == faculty ? "primary" : "default"}
									className={`py-5`}
								>
									<p className="font-medium">Tất cả</p>
								</Button>
								{data && !isLoading ? (
									data
										.filter(({ faculty_name }) => faculty_name)
										.map(({ faculty_name }) => (
											<Button
												ref={
													faculty_name == faculty
														? currentSelectedRef
														: null
												}
												onPress={() => {
													setFaculty?.(faculty_name as string);
													onClose();
												}}
												variant={
													faculty_name == faculty
														? "shadow"
														: "flat"
												}
												color={
													faculty_name == faculty
														? "primary"
														: "default"
												}
												className={`py-5`}
												key={faculty_name}
											>
												<p className="font-medium">
													{" "}
													{faculty_name}
												</p>
											</Button>
										))
								) : (
									<div className=" flex flex-row gap-3">
										<Spinner size="sm" />
										<p className=" text-sm font-medium">Đang tải</p>
									</div>
								)}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
		// <Dropdown backdrop="blur" shouldBlockScroll={false}>
		// 	<DropdownTrigger>
		// 	</DropdownTrigger>
		// 	<DropdownMenu
		// 		variant="faded"
		// 		aria-label="Program dropdown"
		// 		selectionMode="single"
		// 		selectedKeys={new Set([faculty || ""])}
		// 		onAction={(key) => setFaculty?.(key as string)}
		// 	>
		// 		<DropdownSection title="Chọn khoa">
		// 		</DropdownSection>
		// 		<DropdownSection title={"Khác"}>
		// 			<DropdownItem className={`py-2`} key={""}>
		// 				<p className="font-medium">Tất cả</p>
		// 			</DropdownItem>
		// 		</DropdownSection>
		// 	</DropdownMenu>
		// </Dropdown>
	);
}
