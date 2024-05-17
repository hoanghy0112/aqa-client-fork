// "use client";

import { signIn, handlers, auth, signOut, providerMap } from "@/auth/auth";
// import { signIn } from "next-auth/react";

export default function Page() {
	// console.log({ signIn, handlers, auth, signOut });
	return (
		<div className="">
			{Object.values(providerMap).map((provider) => (
				<form
					key={provider.id}
					className=" mx-auto my-auto max-w-xl flex flex-col gap-3"
					action={async () => {
						"use server";
						await signIn(provider.id);
					}}
				>
					<div className=" flex flex-col gap-2">
						<label className=" text-sm font-medium" htmlFor="username">
							Username
						</label>
						<input
							className=" border-1 rounded-lg py-1 px-2"
							id="username"
							type="text"
							name="username"
						/>
					</div>
					<div className=" flex flex-col gap-2">
						<label className=" text-sm font-medium" htmlFor="password">
							Password
						</label>
						<input
							className=" border-1 rounded-lg py-1 px-2"
							id="password"
							type="password"
							name="password"
						/>
					</div>
					<button
						type="submit"
						className=" mt-4 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 duration-200 p-2 rounded-lg"
					>
						<p className=" text-sm font-medium text-white">Đăng nhập</p>
					</button>
				</form>
			))}
		</div>
	);
}
