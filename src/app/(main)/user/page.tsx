"use client";

import AddUserButton from "@/components/AddUserButton";
import { ROLE_ENUM } from "@/constants/role";
import { Role, useProfileQuery, useUsersQuery } from "@/gql/graphql";
import { timeDiffString } from "@/utils/timeDiff";
import {
	Input,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

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

export default function Page({ children }: { children: ReactNode }) {
	const router = useRouter();

	const [keyword, setKeyword] = useState("");

	const { data, loading } = useProfileQuery({ fetchPolicy: "network-only" });
	const { data: usersData, loading: usersLoading } = useUsersQuery({
		variables: { name: keyword },
		fetchPolicy: "network-only",
	});
	console.log({ usersData });

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
			<div className=" flex justify-between items-center">
				<h1 className="font-semibold text-3xl">Quản lý tài khoản</h1>
				<AddUserButton />
			</div>
			<div className=" flex flex-col gap-2">
				<h2 className=" font-semibold text-base">Danh sách tài khoản</h2>
				<Input
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					onClear={() => setKeyword("")}
					isClearable
					type="text"
					size="md"
					placeholder="Nhập tên tài khoản cần tìm..."
					variant="bordered"
					className="w-full"
				/>
				<Skeleton
					isLoaded={!usersLoading}
					className=" -mx-2 rounded-xl min-h-[400px] bg-background dark:bg-black"
					disableAnimation={false}
				>
					<div className=" w-full p-2">
						<Table aria-label="User table">
							<TableHeader>
								<TableColumn>TÊN HIỂN THỊ</TableColumn>
								<TableColumn>VAI TRÒ</TableColumn>
								<TableColumn>TÊN ĐĂNG NHẬP</TableColumn>
								<TableColumn>ĐĂNG NHẬP LẦN CUỐI</TableColumn>
							</TableHeader>
							<TableBody>
								{(usersData?.users || []).map(
									({
										displayName,
										role,
										username,
										id,
										lastAccess,
									}) => (
										<TableRow key={id}>
											<TableCell>
												<p className=" font-semibold">
													{displayName}
												</p>
											</TableCell>
											<TableCell>
												<p className=" font-semibold">
													{ROLE_ENUM[role]}
												</p>
											</TableCell>
											<TableCell>{username}</TableCell>
											<TableCell>
												{lastAccess
													? timeDiffString(lastAccess)
													: "Chưa từng đăng nhập trước đây"}
											</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</div>
				</Skeleton>
			</div>
		</div>
	);
}
