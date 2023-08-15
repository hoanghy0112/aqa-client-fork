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
			<Tabs aria-label="Options">
				{tabs.map((tab) => (
					<Tab key={tab.title} title={tab.title}>
						<Card className=" mt-5 p-0">
							<CardBody className="p-0">{tab.body}</CardBody>
						</Card>
					</Tab>
				))}
			</Tabs>
		</div>
	);
}
