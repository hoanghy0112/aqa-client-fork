"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { ReactNode } from "react";

export default function NavigationTab({
	tabs,
	classNames = "",
}: {
	tabs: {
		title: string;
		body: ReactNode;
	}[];
	classNames?: string;
}) {
	return (
		<div className={classNames}>
		</div>
	);
}
