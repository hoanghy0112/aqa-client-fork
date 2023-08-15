"use client";

import { GET_CRITERIA_NAME } from "@/constants/api_endpoint";
import SemesterContext from "@/contexts/SemesterContext";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
	Divider,
	Card,
	Skeleton,
	Input,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

export default function CriteriaSelector({
	criteria,
	setCriteria,
	onClose,
}: {
	criteria: Criteria | undefined;
	setCriteria: (d: Criteria | undefined) => void;
	onClose: (d: any) => any;
}) {
	const { semester } = useContext(SemesterContext);
	const { data, isLoading, error } = useSWR<Criteria[]>(
		`${GET_CRITERIA_NAME}?semester_id=${semester?.semester_id || ""}`,
		(url: string) => fetch(url).then((r) => r.json())
	);

	const [keyword, setKeyword] = useState("");

	const criterias = useMemo<Criteria[]>(
		() =>
			data?.filter((criteria) => criteria.display_name.includes(keyword)) ||
			[],
		[keyword, isLoading]
	);

	return (
		<>
			<ModalHeader className="flex flex-col gap-1">
				<p> Chọn tiêu chí</p>
				<Input
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					onClear={() => setKeyword("")}
					isClearable
					type="text"
					size="md"
					placeholder="Nhập từ khóa cần tìm..."
					variant="bordered"
					className="w-[500px] mt-5"
				/>
			</ModalHeader>
			<ModalBody className="mb-5">
				{!isLoading && !error ? (
					<>
						{criterias?.map(({ criteria_id, display_name, index }) => (
							<div key={index} className="">
								<Card
									isPressable
									className="py-3 px-4 w-full"
									radius="sm"
								>
									<p className=" text-sm mb-2 ">{`Tiêu chí ${index}`}</p>
									<h1 className=" text-md w-full font-medium text-start">
										{display_name}
									</h1>
								</Card>
							</div>
						))}
					</>
				) : (
					Array(6)
						.fill(0)
						.map((_, index) => (
							<div key={index}>
								<Skeleton className="w-fit h-fit">
									<motion.div
										className="h-12"
										initial={{ width: 0 }}
										animate={{
											width: Math.floor(Math.random() * 500 + 100),
										}}
										transition={{
											ease: "easeOut",
											duration: 0.3,
										}}
									/>
								</Skeleton>
							</div>
						))
				)}
			</ModalBody>
			{/* <ModalFooter>
				<Button color="danger" variant="light" onClick={onClose}>
					Close
				</Button>
				<Button color="primary" onPress={onClose}>
					Action
				</Button>
			</ModalFooter> */}
		</>
	);
}
