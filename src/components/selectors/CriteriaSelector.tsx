"use client";

import { GET_CRITERIA_NAME } from "@/constants/api_endpoint";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import useNavigate from "@/hooks/useNavigate";
import withQuery from "@/utils/withQuery";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/modal";
import { Skeleton } from "@nextui-org/skeleton";
import { Tooltip } from "@nextui-org/tooltip";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import OptionButton from "../OptionButton";
import ProgramIcon from "@/assets/ProgramIcon";
import CriteriaIcon from "@/assets/CriteriaIcon";

type Props = {
	criteria?: Criteria;
	setCriteria: (d: Criteria) => any;
	data?: Criteria[];
	isLoading: boolean;
	error: any;
};

function CriteriaSelector_({
	criteria,
	setCriteria,
	data,
	isLoading,
	error,
}: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [keyword, setKeyword] = useState("");

	const hasValue = Boolean(criteria?.index);
	const buttonText = hasValue ? `Tiêu chí ${criteria?.index}` : "Tiêu chí";

	const criterias = useMemo<Criteria[]>(
		() =>
			data?.filter((criteria) => criteria.display_name.includes(keyword)) ||
			[],
		[keyword, data]
	);

	return (
		<>
			<OptionButton
				tooltip={
					hasValue
						? criteria?.display_name
						: "Nếu không chọn, tất cả các tiêu chí sẽ được xét"
				}
				hasValue={hasValue}
				onPress={onOpen}
				startContent={
					<CriteriaIcon
						color={hasValue ? "white" : undefined}
						width={20}
					/>
				}
			>
				{buttonText}
			</OptionButton>
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
									className="w-full mt-5"
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
														display_name:
															"Tất cả tiêu chí",
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
											({
												criteria_id,
												display_name,
												index,
											}) => (
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
																Math.random() * 500 +
																	100
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

export default function CriteriaSelector() {
	const { criteria, setCriteria, semester } = useFilter();

	const { data, isLoading, error } = useSWR<Criteria[]>(
		withQuery(GET_CRITERIA_NAME, {
			semester_id: semester?.semester_id,
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	return (
		<FilterProvider>
			<CriteriaSelector_
				criteria={criteria}
				setCriteria={setCriteria}
				data={data}
				isLoading={isLoading}
				error={error}
			/>
		</FilterProvider>
	);
}

export function CriteriaSelectorWithSearchParam() {
	const navigate = useNavigate();
	const searchParams = useSearchParams();

	const setCriteria = useCallback(
		(d: Criteria) => {
			navigate.push({ criteria: d.criteria_id });
		},
		[navigate]
	);

	const { data, isLoading, error } = useSWR<Criteria[]>(
		withQuery(GET_CRITERIA_NAME, {
			semester_id: searchParams.get("semester"),
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	return (
		<FilterProvider>
			<CriteriaSelector_
				criteria={data?.find(
					(v) => v.criteria_id === searchParams.get("criteria")
				)}
				setCriteria={setCriteria}
				data={data}
				isLoading={isLoading}
				error={error}
			/>
		</FilterProvider>
	);
}
// "use client";

// import { GET_CRITERIA_NAME } from "@/constants/api_endpoint";
// import { FilterProvider, useFilter } from "@/contexts/FilterContext";
// import useNavigate from "@/hooks/useNavigate";
// import withQuery from "@/utils/withQuery";
// import { Button } from "@nextui-org/button";
// import { Card } from "@nextui-org/card";
// import { Input } from "@nextui-org/input";
// import {
// 	Modal,
// 	ModalBody,
// 	ModalContent,
// 	ModalHeader,
// 	useDisclosure,
// } from "@nextui-org/modal";
// import { Skeleton } from "@nextui-org/skeleton";
// import { Tooltip } from "@nextui-org/tooltip";
// import { motion } from "framer-motion";
// import { useSearchParams } from "next/navigation";
// import { useCallback, useMemo, useState } from "react";
// import useSWR from "swr";
// import OptionButton from "../OptionButton";

// type Props = {
// 	criteria?: Criteria;
// 	setCriteria: (d: Criteria) => any;
// 	data?: Criteria[];
// 	isLoading: boolean;
// 	error: any;
// };

// function CriteriaSelector_({
// 	criteria,
// 	setCriteria,
// 	data,
// 	isLoading,
// 	error,
// }: Props) {
// 	const { isOpen, onOpen, onOpenChange } = useDisclosure();

// 	const [keyword, setKeyword] = useState("");

// 	const hasValue = Boolean(criteria?.index);

// 	const criterias = useMemo<Criteria[]>(
// 		() =>
// 			data?.filter((criteria) => criteria.display_name.includes(keyword)) ||
// 			[],
// 		[keyword, data]
// 	);

// 	return (
// 		<>
// 			<Tooltip
// 				content={
// 					<div className="">
// 						<p className=" max-w-md h-auto">
// 							{criteria
// 								? criteria.display_name
// 								: "Nếu không chọn, tất cả các tiêu chí sẽ được xét"}
// 						</p>
// 					</div>
// 				}
// 			>
// 				<OptionButton onPress={onOpen} hasValue={hasValue}>
// 					{hasValue ? `Tiêu chí ${criteria?.index}` : "Tất cả tiêu chí"}
// 				</OptionButton>
// 			</Tooltip>
// 			<Modal
// 				isOpen={isOpen}
// 				className="h-full"
// 				backdrop="blur"
// 				size="3xl"
// 				onOpenChange={onOpenChange}
// 				scrollBehavior={"inside"}
// 			>
// 				<ModalContent>
// 					{(onClose) => (
// 						<>
// 							<ModalHeader className="flex flex-col gap-1">
// 								<p> Chọn tiêu chí</p>
// 								<Input
// 									value={keyword}
// 									onChange={(e) => setKeyword(e.target.value)}
// 									onClear={() => setKeyword("")}
// 									isClearable
// 									type="text"
// 									size="md"
// 									placeholder="Nhập từ khóa cần tìm..."
// 									variant="bordered"
// 									className="w-full mt-5"
// 								/>
// 							</ModalHeader>
// 							<ModalBody className="mb-5">
// 								{!isLoading && !error ? (
// 									<>
// 										<div>
// 											<Card
// 												isPressable
// 												onPress={() => {
// 													setCriteria({
// 														criteria_id: "",
// 														display_name:
// 															"Tất cả tiêu chí",
// 														index: 0,
// 													});
// 													onClose();
// 												}}
// 												className="py-3 px-4 w-full"
// 												radius="sm"
// 											>
// 												<p className=" text-md font-semibold mb-1 text-start">
// 													Tất cả
// 												</p>
// 												<p className=" text-sm w-full font-normal text-start">
// 													Chọn tất cả các tiêu chí
// 												</p>
// 											</Card>
// 										</div>
// 										{criterias?.map(
// 											({
// 												criteria_id,
// 												display_name,
// 												index,
// 											}) => (
// 												<div key={index} className="">
// 													<Card
// 														isPressable
// 														onPress={() => {
// 															setCriteria({
// 																criteria_id,
// 																display_name,
// 																index,
// 															});
// 															onClose();
// 														}}
// 														className="py-3 px-4 w-full"
// 														radius="sm"
// 													>
// 														<p className=" text-md font-semibold mb-1 text-start">{`Tiêu chí ${index}`}</p>
// 														<h1 className=" text-sm w-full font-normal text-start">
// 															{display_name}
// 														</h1>
// 													</Card>
// 												</div>
// 											)
// 										)}
// 									</>
// 								) : (
// 									Array(6)
// 										.fill(0)
// 										.map((_, index) => (
// 											<div key={index}>
// 												<Skeleton className="w-fit h-fit">
// 													<motion.div
// 														className="h-12"
// 														initial={{ width: 0 }}
// 														animate={{
// 															width: Math.floor(
// 																Math.random() * 500 +
// 																	100
// 															),
// 														}}
// 														transition={{
// 															ease: "easeOut",
// 															duration: 0.3,
// 														}}
// 													/>
// 												</Skeleton>
// 											</div>
// 										))
// 								)}
// 							</ModalBody>
// 						</>
// 					)}
// 				</ModalContent>
// 			</Modal>
// 		</>
// 	);
// }

// export default function CriteriaSelector() {
// 	const { criteria, setCriteria, semester } = useFilter();

// 	const { data, isLoading, error } = useSWR<Criteria[]>(
// 		withQuery(GET_CRITERIA_NAME, {
// 			semester_id: semester?.semester_id,
// 		}),
// 		(url: string) => fetch(url).then((r) => r.json())
// 	);

// 	return (
// 		<FilterProvider>
// 			<CriteriaSelector_
// 				criteria={criteria}
// 				setCriteria={setCriteria}
// 				data={data}
// 				isLoading={isLoading}
// 				error={error}
// 			/>
// 		</FilterProvider>
// 	);
// }

// export function CriteriaSelectorWithSearchParam() {
// 	const navigate = useNavigate();
// 	const searchParams = useSearchParams();

// 	const setCriteria = useCallback(
// 		(d: Criteria) => {
// 			navigate.push({ criteria: d.criteria_id });
// 		},
// 		[navigate]
// 	);

// 	const { data, isLoading, error } = useSWR<Criteria[]>(
// 		withQuery(GET_CRITERIA_NAME, {
// 			semester_id: searchParams.get("semester"),
// 		}),
// 		(url: string) => fetch(url).then((r) => r.json())
// 	);

// 	return (
// 		<FilterProvider>
// 			<CriteriaSelector_
// 				criteria={data?.find(
// 					(v) => v.criteria_id === searchParams.get("criteria")
// 				)}
// 				setCriteria={setCriteria}
// 				data={data}
// 				isLoading={isLoading}
// 				error={error}
// 			/>
// 		</FilterProvider>
// 	);
// }
