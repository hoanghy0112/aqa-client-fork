"use client";

import { providerMap } from "@/auth/auth";
import { useLoginMutation } from "@/gql/graphql";
import { useAuth } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
	const router = useRouter();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [login] = useLoginMutation();
	const { authData, isLogin, authLogin } = useAuth();

	const handleSignIn = useCallback(async () => {
		const res = await login({ variables: { username, password } });
		if (res.data?.login) {
			authLogin(res.data.login);
			router.push("/");
		}
	}, [login, username, password, authLogin, router]);

	useEffect(() => {
		if (isLogin === true) {
			router.replace("/");
		}
	}, [isLogin, router]);

	return (
		<>
			<div className=" flex-1 grid place-items-center">
				{Object.values(providerMap).map((provider) => (
					<form
						key={provider.id}
						className=" w-unit-6xl max-w-3xl flex flex-col gap-4"
						onSubmit={(e) => {
							e.preventDefault();
							handleSignIn();
						}}
					>
						<div className=" flex flex-col gap-2">
							<label
								className=" text-sm font-medium"
								htmlFor="username"
							>
								Tên đăng nhập
							</label>
							<input
								className=" border-1 rounded-lg py-1 px-2"
								id="username"
								type="text"
								name="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className=" flex flex-col gap-2">
							<label
								className=" text-sm font-medium"
								htmlFor="password"
							>
								Mật khẩu
							</label>
							<input
								className=" border-1 rounded-lg py-1 px-2"
								id="password"
								type="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							type="submit"
							className=" mt-4 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 duration-200 p-2 rounded-lg"
						>
							<p className=" text-sm font-medium text-white">
								Đăng nhập
							</p>
						</button>
					</form>
				))}
			</div>
		</>
	);
}
