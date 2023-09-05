"use client";

import { GET_SUBJECT_TABLE } from "@/constants/api_endpoint";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import useIncrementalFetch from "@/hooks/useIncrementalFetch";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/modal";
import { Card } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import Loading from "../Loading";
import NoData from "../NoData";
import OptionButton from "../OptionButton";
import { SortSelector } from "./SortSelector";
import { useSearchParams } from "next/navigation";
import useNavigate from "@/hooks/useNavigate";

type Props = {
	subjectId?: string | null;
	setSubject: (d: Subject) => any;
};

function SingleSubjectSelector_({ subjectId, setSubject }: Props) {
	const [faculty, setFaculty] = useState<string>();

	const [keyword, setKeyword] = useState<string | undefined>();
	const debouncedKeyword = useDebounce<string>(keyword || "", 500);

	const [sort, setSort] = useState<ISortOptions>("asc");

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const { items, isLoading, hasMore, bottomRef } = useIncrementalFetch<Subject>({
		url: GET_SUBJECT_TABLE,
		query: {
			debouncedKeyword,
			page_size: 20,
			filter_field: "subject_name",
			faculty_name: faculty,
			direction: sort,
		},
	});

	const subject =
		items.find((v) => v.subject_id == subjectId) || isClient
			? JSON.parse(localStorage.getItem("single_subject") || "{}")
			: undefined;

	const hasValue = Boolean(subject);
	const buttonText = hasValue ? subject?.subject_name : "Chọn môn học";

	return (
		<>
			<OptionButton
				tooltip="Chọn môn học"
				onPress={onOpen}
				hasValue={hasValue}
			>
				{buttonText}
			</OptionButton>
			<Modal
				isOpen={isOpen}
				className="h-full"
				backdrop="blur"
				size="4xl"
				onOpenChange={onOpenChange}
				scrollBehavior={"inside"}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								<p>Chọn môn học</p>
								<div className=" mt-5 flex gap-5 items-center">
									<Input
										value={keyword}
										onChange={(e) => setKeyword(e.target.value)}
										onClear={() => setKeyword("")}
										isClearable
										type="text"
										size="md"
										placeholder="Nhập từ khóa cần tìm..."
										variant="bordered"
										className="w-full"
									/>
									<div className="w-fit">
										<FilterProvider
											sort={sort}
											setSort={setSort}
										>
											<SortSelector />
										</FilterProvider>
									</div>
								</div>
							</ModalHeader>
							<ModalBody className="mb-5">
								{items.length > 0 || !isLoading ? (
									<>
										<div className="w-full mb-2">
											<Card
												isPressable
												onPress={() => {
													onClose();
													setSubject({
														subject_id: "",
														subject_name: "",
													} as Subject);
												}}
												className="w-full flex flex-col justify-between cursor-pointer rounded-lg gap-2 px-4 py-3 border-2 border-transparent"
											>
												<p className=" text-md font-semibold mb-1 text-start">
													Không chọn
												</p>
											</Card>
										</div>
										{items?.map(
											({
												subject_name,
												faculty_name,
												subject_id,
											}) => (
												<div
													key={subject_id}
													className="w-full mb-2"
												>
													<Card
														isPressable
														onPress={() => {
															onClose();
															setSubject({
																subject_id,
																subject_name,
																faculty_name,
															} as Subject);
														}}
														className="w-full flex flex-col justify-between cursor-pointer rounded-lg gap-2 px-4 py-3 border-2 border-transparent"
													>
														<p className=" text-md font-semibold mb-1 text-start">
															{subject_name}
														</p>
														<p className=" text-sm w-full font-normal text-start">
															{faculty_name}
														</p>
													</Card>
												</div>
											)
										)}
									</>
								) : (
									Array(6)
										.fill(0)
										.map((_, index) => (
											<div key={index} className="rounded-md">
												<Skeleton className="w-fit h-fit rounded-md">
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
								{hasMore ? <Loading /> : <NoData />}
								<div ref={bottomRef} />
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

export default function SingleSubjectSelector({
	onSelect,
}: {
	onSelect?: (d: Subject) => any;
}) {
	const { subjects, setSubjects } = useFilter();

	const setSubject = useCallback((d: Subject) => {
		onSelect?.(d);
		setSubjects(new Map([[d.subject_id, d]]));
	}, []);

	return (
		<SingleSubjectSelector_
			subjectId={Array.from(subjects.values())?.[0]?.subject_id || ""}
			setSubject={setSubject}
		/>
	);
}

export function SingleSubjectSelectorWithSearchParam({
	onSelect,
}: {
	onSelect?: (d: Subject) => any;
}) {
	const searchParams = useSearchParams();
	const navigate = useNavigate();

	const setSubject = useCallback(
		(d: Subject) => {
			onSelect?.(d);
			if (d.faculty_name)
				navigate.replace({
					subject_id: d.subject_id,
					faculty: d.faculty_name,
				});
			else navigate.replace({ subject_id: d.subject_id });
		},
		[navigate]
	);

	return (
		<SingleSubjectSelector_
			subjectId={searchParams.get("subject_id")}
			setSubject={setSubject}
		/>
	);
}

export function SingleSubjectSelectorWithProps({
	subjectId,
	setSubjectId,
}: {
	subjectId?: string;
	setSubjectId?: (d: string) => any;
}) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const setSubject = useCallback(
		(d: Subject) => {
			if (isClient) localStorage.setItem("single_subject", JSON.stringify(d));
			setSubjectId?.(d.subject_id);
		},
		[isClient]
	);

	return <SingleSubjectSelector_ subjectId={subjectId} setSubject={setSubject} />;
}
