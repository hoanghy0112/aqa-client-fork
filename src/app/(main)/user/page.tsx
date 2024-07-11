"use client";

import BreadCrumb from "@/components/BreadCrumb";
import PageTabs from "@/components/PageTabs";
import { Role, useProfileQuery } from "@/gql/graphql";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const tabs = [
	{
		link: "",
		title: "Trang chủ",
	},
	{
		link: "list",
		title: "Danh sách giảng viên",
	},
];

export default function Layout({ children }: { children: ReactNode }) {
	const router = useRouter();

	const { data, loading } = useProfileQuery({ fetchPolicy: "network-only" });

	useEffect(() => {
		tabs.forEach(({ link }) => router.prefetch(`/lecturer/${link}`));
	}, [router]);

	useEffect(() => {
		if (!loading && data?.profile.role !== Role.Admin) {
			router.replace("/signin");
		}
	}, [data, loading, router]);

	return (
		<div className=" flex flex-col gap-8">
			<h1 className="font-semibold text-3xl">Quản lý tài khoản</h1>
			<div className=" flex flex-col gap-2">
				<div></div>
			</div>
		</div>
	);
}
