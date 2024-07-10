"use client";

import LecturerNavIcon from "@/assets/LecturerNavIcon";
import NavigationDrawer, { NavItem } from "@/components/NavigationDrawer";
import { useAuth } from "@/stores/auth.store";
import CommentIcon from "@assets/CommentIcon";
import CriteriaIcon from "@assets/CriteriaIcon";
import HomeIcon from "@assets/HomeIcon";
import SubjectIcon from "@assets/SubjectIcon";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { authData, isLogin } = useAuth();

	useEffect(() => {
		if (!!getCookie("isLogin") == false) {
			router.replace("/signin");
		}
	}, [isLogin, router]);

	return (
		<>
			<NavigationDrawer>
				<NavItem title="Trang chủ" link="/" icon={HomeIcon} />
				<NavItem
					title="Bình luận"
					link="/comment"
					icon={CommentIcon}
					subItems={[
						{
							title: "Tất cả",
							link: "/comment",
						},
						{
							title: "Tích cực",
							link: "/comment?type=positive",
						},
						{
							title: "Tiêu cực",
							link: "/comment?type=negative",
						},
					]}
				/>
				<NavItem
					title="Môn học"
					link="/subject"
					icon={SubjectIcon}
					subItems={[
						{
							title: "Điểm trung bình các môn",
							link: "/subject/average-point",
						},
						{
							title: "Điểm trung bình qua các học kỳ",
							link: "/subject/point-per-year",
						},
					]}
				/>
				<NavItem
					title="Giảng viên"
					link="/lecturer"
					icon={LecturerNavIcon}
				/>
				<NavItem title="Tiêu chí" link="/criteria" icon={CriteriaIcon} />
			</NavigationDrawer>
			<main className="w-full xl:px-20 lg:px-16 px-5 pt-12 pb-10 overflow-y-scroll overflow-x-hidden">
				<Suspense fallback={<p>Loading</p>}>{children}</Suspense>
			</main>
		</>
	);
}
