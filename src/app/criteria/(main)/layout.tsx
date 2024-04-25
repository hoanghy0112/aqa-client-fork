"use client";

import BreadCrumb from "@/components/BreadCrumb";
import PageTabs from "@/components/Tabs";
import { FilterProvider } from "@/contexts/FilterContext";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<FilterProvider>
			<h1 className="font-semibold text-3xl">Tiêu chí</h1>
			<BreadCrumb />
			<PageTabs
				baseTab="criteria"
				tabs={[
					{
						link: "",
						title: "Trang chủ",
					},
					{
						link: "detail",
						title: "Chi tiết",
					},
				]}
			/>
			<div className=" w-full mt-5 p-0 h-[420px]">{children}</div>
		</FilterProvider>
	);
}
