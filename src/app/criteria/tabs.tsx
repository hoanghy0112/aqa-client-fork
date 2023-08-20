"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function CriteriaTabs({
	tabs,
	selectedTab,
}: {
	tabs: { link: string; title: string }[];
	selectedTab: string;
}) {
	const router = useRouter();
	const pathname = usePathname();

	const currTab = pathname.split("/")[2];

	return (
		<Tabs
			selectedKey={currTab}
			onSelectionChange={(tab) => {
				router.push(`/criteria/${tab}`);
			}}
			className="mt-12"
			aria-label="Options"
		>
			{tabs.map(({ title, link }) => (
				<Tab key={link} title={title} />
			))}
		</Tabs>
	);
}
