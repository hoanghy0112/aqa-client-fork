import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
	params: { subject_id: string };
	// searchParams: { [key: string]: string | undefined };
	searchParams: any;
	children: ReactNode;
};

export default function Layout({
	params: { subject_id },
	children,
	searchParams,
}: Props) {
	return children;
}

export const metadata: Metadata = {
	title: "Thống kê bình luận",
};
