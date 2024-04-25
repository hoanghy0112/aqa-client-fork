"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function PageTabs({
	defaultPath,
	tabs,
	className = "mt-12",
}: {
	defaultPath: string;
	tabs: { link: string; title: string }[];
	className?: string;
}) {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Tabs
			selectedKey={pathname.split("/").at(2) || ""}
			onSelectionChange={(tab) => {
				router.push(`/${defaultPath}/${tab}`);
			}}
			className={className}
			aria-label="Page tabs"
		>
			{tabs.map(({ title, link }) => (
				<Tab key={link} title={title} />
			))}
		</Tabs>
	);
}
