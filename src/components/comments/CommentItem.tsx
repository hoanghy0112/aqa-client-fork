"use client";

import { motion } from "framer-motion";

import COPY_ICON from "@assets/copy.svg";
import Image from "next/image";

import { Card } from "@nextui-org/react";

export default function CommentItem({
	content,
	type,
}: {
	content: string;
	type: "positive" | "negative";
	comment_id: string;
	teach_id: string;
	isLast: boolean;
}) {
	return (
		<Card isPressable shadow="none">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					ease: "easeOut",
					duration: 0.6,
				}}
				className="w-full px-3 py-4 flex flex-row items-center border-b-1 border-b-slate-400 dark:border-b-slate-600"
			>
				<p className="font-medium text-md">{content}</p>
				<div className="ml-auto w-56 pl-5 flex shrink-0 flex-row gap-5">
					<Card
						isPressable
						shadow="sm"
						className="p-3 w-12 flex flex-row items-center"
					>
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
						className={`p-2 w-28 grid items-center ${
							type === "positive"
								? "bg-green-300 dark:bg-green-700"
								: "bg-red-300 dark:bg-red-700"
						}`}
					>
						<p className=" capitalize font-medium text-md py-1">
							{type}
						</p>
					</Card>
				</div>
			</motion.div>
		</Card>
	);
}
