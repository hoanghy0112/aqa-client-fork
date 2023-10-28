"use client";

import CriteriaList from "@/components/criteria/CriteriaList";
import { FilterProvider } from "@/contexts/FilterContext";
import { ReactNode } from "react";
import CriteriaTabs from "./tabs";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<FilterProvider>
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
			<div className=" w-full mt-5 p-0 h-[420px]">{children}</div>
			<CriteriaList />
		</FilterProvider>
	);
}
