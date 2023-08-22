"use client";

import { Card, CardBody } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";
import CriteriaTabs from "./tabs";
import { FilterProvider } from "@/contexts/FilterContext";
import CriteriaList from "@/components/criteria/CriteriaList";

export default function Layout({ children }: { children: ReactNode }) {
	const pathName = usePathname();
	const tabName = useMemo(() => pathName.split("/").at(-1) || "", [pathName]);

	return (
		<>
			<h1 className="font-semibold text-3xl">Tiêu chí</h1>
			<CriteriaTabs
				tabs={[
					{
						link: "",
						title: "Biểu đồ từng tiêu chí",
					},
					{
						link: "#",
						title: "()",
					},
				]}
			/>
			<Card className=" w-full mt-5 p-0 h-[420px]">
				<CardBody className="p-0">{children}</CardBody>
			</Card>
			<FilterProvider>{/* <CriteriaList /> */}</FilterProvider>
		</>
	);
}
