"use client";

import { Card } from "@nextui-org/react";
import { ReactNode } from "react";

export default function CommentList({ children }: { children: ReactNode }) {
	return <Card className="mt-16 w-full p-5">{children}</Card>;
}
