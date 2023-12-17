import Link from "next/link";
import { ReactNode } from "react";

export default function TextLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	return (
		<Link href={href}>
			<span className=" underline font-medium hover:text-sky-600 hover:dark:text-sky-500">
				{children}
			</span>
		</Link>
	);
}
