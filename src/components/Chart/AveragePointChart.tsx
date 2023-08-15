"use client";

import { Card, Title, AreaChart, BarChart } from "@tremor/react";

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";

import BaseChart from "./BaseChart";
import SemesterSelector from "../SemesterSelector/SemesterSelector";
import { useState } from "react";
import SemesterContext from "@/contexts/SemesterContext";
import CriteriaSelector from "../CriteriaSelector";

export default function AveragePointChart() {
	const [semester, setSemester] = useState<Semester | undefined>();
	const [criteria, setCriteria] = useState<Criteria | undefined>();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<BaseChart>
			<div className=" flex flex-row gap-5 justify-end items-center px-8 py-5 mb-8">
				<Title className=" mr-auto">
					Biểu đồ điểm trung bình các môn học
				</Title>
				<SemesterContext.Provider
					value={{ semester, setSemester: (data) => setSemester(data) }}
				>
					<SemesterSelector />
					<Button onPress={onOpen}>
						{criteria ? criteria.display_name : "Chọn tiêu chí"}
					</Button>

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
								<CriteriaSelector
									criteria={criteria}
									setCriteria={setCriteria}
									onClose={onClose}
								/>
							)}
						</ModalContent>
					</Modal>
				</SemesterContext.Provider>
			</div>
			<div className=" px-14">
				<BarChart
					className=" h-72 mt-4"
					data={chartdata}
					index="date"
					categories={["SemiAnalysis", "The Pragmatic Engineer"]}
					colors={["sky", "green"]}
					valueFormatter={dataFormatter}
				/>
			</div>
		</BaseChart>
	);
}

const dataFormatter = (number: number) => {
	return "$ " + Intl.NumberFormat("us").format(number).toString();
};

const chartdata = [
	{
		date: "Jan 22",
		SemiAnalysis: 2890,
		"The Pragmatic Engineer": 2338,
	},
	{
		date: "Feb 22",
		SemiAnalysis: 2756,
		"The Pragmatic Engineer": 2103,
	},
	{
		date: "Mar 22",
		SemiAnalysis: 3322,
		"The Pragmatic Engineer": 2194,
	},
	{
		date: "Apr 22",
		SemiAnalysis: 3470,
		"The Pragmatic Engineer": 2108,
	},
	{
		date: "May 22",
		SemiAnalysis: 3475,
		"The Pragmatic Engineer": 1812,
	},
	{
		date: "Jun 22",
		SemiAnalysis: 3129,
		"The Pragmatic Engineer": 1726,
	},
];
