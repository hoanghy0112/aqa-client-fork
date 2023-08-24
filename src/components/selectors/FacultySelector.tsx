"use client";

import { GET_FACULTY_LIST } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import { defaultFetcher } from "@/utils/fetchers";
import { Button } from "@nextui-org/button";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useRef } from "react";
import useSWR from "swr";

export default function FacultySelector() {
	const { faculty, setFaculty, setSubjects } = useFilter();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { data, isLoading } = useSWR<Faculty[]>(GET_FACULTY_LIST, defaultFetcher);

	const currentSelectedRef = useRef<any>();

	useEffect(() => {
		if (currentSelectedRef.current) {
			currentSelectedRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [isOpen]);

	useEffect(() => {
		setSubjects(new Map());
	}, [faculty, setSubjects]);

	return (
		<>
			<Button onPress={onOpen} variant="bordered" className="w-fit">
				<p className="font-medium w-fit">
					{faculty?.faculty_name || "Chọn khoa"}
				</p>
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
								{data && !isLoading ? (
									data.map(
										({ faculty_name = "", faculty_id = "" }) => (
											<Button
												ref={
													faculty_name ==
													faculty?.faculty_name
														? currentSelectedRef
														: null
												}
												onPress={() => {
													setFaculty?.({
														faculty_id,
														faculty_name,
													});
													onClose();
												}}
												variant={
													faculty_name ==
													faculty?.faculty_name
														? "shadow"
														: "flat"
												}
												color={
													faculty_name ==
													faculty?.faculty_name
														? "primary"
														: "default"
												}
												className={`py-5`}
												key={faculty_name}
											>
												<p className="font-medium">
													{faculty_name || "Tất cả"}
												</p>
											</Button>
										)
									)
								) : (
									<div className=" flex flex-row gap-3">
										<Spinner size="sm" />
										<p className=" text-sm font-medium">
											Đang tải
										</p>
									</div>
								)}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
