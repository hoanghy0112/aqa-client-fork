"use client";

import { Card } from "@nextui-org/react";
import { ReactNode } from "react";

export default function CommentWrapper({ children }: { children: ReactNode }) {
	return <Card className="mt-16 mb-20 w-full p-5">{children}</Card>;
}
