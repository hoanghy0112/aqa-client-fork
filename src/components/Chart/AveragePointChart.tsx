"use client";

import { Card, Title, AreaChart, BarChart } from "@tremor/react";

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";

import BaseChart from "./BaseChart";
import SemesterSelector from "../SemesterSelector/SemesterSelector";
import { useState } from "react";
import SemesterContext from "@/contexts/SemesterContext";
import CriteriaSelector from "../CriteriaSelector";
import useSWR from "swr";
import { GET_SUBJECT_AVERAGE_POINT } from "@/constants/api_endpoint";
import withQuery from "@/utils/withQuery";

export default function AveragePointChart() {
	const [semester, setSemester] = useState<Semester | undefined>();
	const [criteria, setCriteria] = useState<Criteria | undefined>();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { data } = useSWR(
		withQuery(GET_SUBJECT_AVERAGE_POINT, {
			semester_id: semester?.semester_id,
			criteria_id: criteria?.criteria_id,
		}),
		(url: string) => fetch(url).then((r) => r.json())
	);

	// console.log({
	// 	data,
	// 	link: withQuery(GET_SUBJECT_AVERAGE_POINT, {
	// 		semester_id: semester?.semester_id,
	// 		criteria_id: criteria?.criteria_id,
	// 	}),
	// });

	return (
		<BaseChart>
			<div className=" flex flex-row gap-5 justify-end items-center px-8 py-5 mb-8">
				<Title className=" mr-auto w-full">
					<p> Biểu đồ điểm trung bình các môn học</p>
					<div className="w-3/4 mt-2">
						<p className="w-full font-normal text-sm">
							{criteria?.display_name || "Tất cả các tiêu chí"}
						</p>
					</div>
				</Title>
				<SemesterContext.Provider
					value={{ semester, setSemester: (data) => setSemester(data) }}
				>
					<SemesterSelector />
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
						<Button onPress={onOpen}>
							{criteria ? `Tiêu chí ${criteria.index}` : "Chọn tiêu chí"}
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
