"use client";

import { IFeatureIntroduction } from "@/constants/home_introduction";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import NextLink from "next/link";

export default function FeatureCard({
	introduction: { title, description, navigation_links },
}: {
	introduction: IFeatureIntroduction;
}) {
	return (
		<Card className="w-full h-fit px-5 mb-14">
			<CardHeader className=" flex flex-col items-start pt-4">
				<h1 className="text-xl font-medium mb-3">{title.displayName}</h1>
				<p className="text-gray-500">{description}</p>
			</CardHeader>
			{navigation_links.length != 0 ? (
				<CardBody className="pt-2 pb-4">
					<ul className="list-disc pl-3">
						{navigation_links.map(({ displayName, link }) => (
							<li
								key={link}
								className="hover:underline cursor-pointer py-1"
							>
								{displayName}
							</li>
						))}
					</ul>
				</CardBody>
			) : null}
			<CardFooter>
				<NextLink href={title.link}>Xem chi tiết</NextLink>
			</CardFooter>
		</Card>
	);
}
