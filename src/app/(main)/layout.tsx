import LecturerNavIcon from "@/assets/LecturerNavIcon";
import { auth, signIn } from "@/auth/auth";
import NavigationDrawer, { NavItem } from "@/components/NavigationDrawer";
import CommentIcon from "@assets/CommentIcon";
import CriteriaIcon from "@assets/CriteriaIcon";
import HomeIcon from "@assets/HomeIcon";
import SubjectIcon from "@assets/SubjectIcon";
import { Suspense } from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
	const session = await auth();

	console.log({ session });
	if (!session) await signIn();

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
