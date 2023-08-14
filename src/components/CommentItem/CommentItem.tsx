"use client";

import COPY_ICON from "@assets/copy.svg";
import Image from "next/image";

import { Button, Card } from "@nextui-org/react";

export default function CommentItem({
	content,
	type,
	comment_id,
	teach_id,
	isLast,
}: {
	content: string;
	type: "positive" | "negative";
	comment_id: string;
	teach_id: string;
	isLast: boolean;
}) {
	return (
		<div className="px-3 py-4 flex flex-row items-center border-b-1 border-b-slate-400 dark:border-b-slate-600">
			<p className="font-medium text-md">{content}</p>
			<div className="ml-auto pl-5 flex shrink-0 flex-row gap-5">
				<Card isPressable shadow="sm" className="p-3 flex flex-row items-center">
					<Image
						src={COPY_ICON}
						width={24}
						height={24}
						alt="Copy comment"
					/>
				</Card>
				<Card
					isPressable
					shadow="sm"
					className={`p-2 ${
						type === "positive"
							? "bg-green-300 dark:bg-green-700"
							: "bg-red-300 dark:bg-red-700"
					}`}
				>
					<p className=" capitalize font-medium text-md w-24 py-1">{type}</p>
				</Card>
			</div>
		</div>
	);
}
