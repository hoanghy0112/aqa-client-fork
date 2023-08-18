"use client";

import { GET_CRITERIA_NAME } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import withQuery from "@/utils/withQuery";
import {
	Button,
	Card,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Skeleton,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import useSWR from "swr";

export default function CriteriaSelector() {
	const { criteria, setCriteria } = useFilter();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { semester } = useFilter();

	const { data, isLoading, error } = useSWR<Criteria[]>(
		withQuery(GET_CRITERIA_NAME, {
			semester_id: semester?.semester_id,
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	const [keyword, setKeyword] = useState("");

	const criterias = useMemo<Criteria[]>(
		() =>
			data?.filter((criteria) => criteria.display_name.includes(keyword)) ||
			[],
		[keyword, data]
	);

	return (
		<>
			<Tooltip
				content={
					<div className="">
						<p className=" max-w-md h-auto">
							{criteria
								? criteria.display_name
								: "Nếu không chọn, tất cả các tiêu chí sẽ được xét"}
						</p>
					</div>
				}
			>
				<Button onPress={onOpen} className="">
					<p className="">
						{criteria?.index
							? `Tiêu chí ${criteria.index}`
							: "Tất cả tiêu chí"}
					</p>
				</Button>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				className="h-full"
				backdrop="blur"
				size="3xl"
				onOpenChange={onOpenChange}
				scrollBehavior={"inside"}
			>
				<ModalContent>
					{(onClose) => (
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
										<div>
											<Card
												isPressable
												onPress={() => {
													setCriteria({
														criteria_id: "",
														display_name: "Tất cả tiêu chí",
														index: 0,
													});
													onClose();
												}}
												className="py-3 px-4 w-full"
												radius="sm"
											>
												<p className=" text-md font-semibold mb-1 text-start">
													Tất cả
												</p>
												<p className=" text-sm w-full font-normal text-start">
													Chọn tất cả các tiêu chí
												</p>
											</Card>
										</div>
										{criterias?.map(
											({ criteria_id, display_name, index }) => (
												<div key={index} className="">
													<Card
														isPressable
														onPress={() => {
															setCriteria({
																criteria_id,
																display_name,
																index,
															});
															onClose();
														}}
														className="py-3 px-4 w-full"
														radius="sm"
													>
														<p className=" text-md font-semibold mb-1 text-start">{`Tiêu chí ${index}`}</p>
														<h1 className=" text-sm w-full font-normal text-start">
															{display_name}
														</h1>
													</Card>
												</div>
											)
										)}
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
															width: Math.floor(
																Math.random() * 500 + 100
															),
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
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
