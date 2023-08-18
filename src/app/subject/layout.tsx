"use client";

import SubjectTable from "@/components/subjects/SubjectTable";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";
import SubjectTabs from "./tabs";

export default function Layout({ children }: { children: ReactNode }) {
	const pathName = usePathname();
	const tabName = useMemo(() => pathName.split("/").at(-1) || "", [pathName]);

	return (
		<>
			<h1 className="font-semibold text-3xl">Môn học</h1>
			<SubjectTabs
				selectedTab={tabName}
				tabs={[
					{
						link: "average-point",
						title: "Biểu đồ điểm trung bình",
					},
					{
						link: "point-per-year",
						title: "Thống kê điểm trung bình qua các năm",
					},
				]}
			/>
			<Card className=" w-full mt-5 p-0 h-[400px]">
				<CardBody className="p-0">{children}</CardBody>
			</Card>
			<SubjectTable />
		</>
	);
}
