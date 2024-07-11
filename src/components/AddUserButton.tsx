"use client";

import { ROLE_ENUM } from "@/constants/role";
import { Role } from "@/gql/graphql";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

export default function AddUserButton({}: Props) {
	const [displayName, setDisplayName] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [role, setRole] = useState<Role>();
	const [password, setPassword] = useState<string>("");
	const [password2, setPassword2] = useState<string>("");

	const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	// const {} = useRegist

	const handleAddUser = useCallback(
		(callback: () => any) => {
			if (password !== password2) {
				setIsPasswordMatch(false);
				toast.error("Mật khẩu không khớp");
				return;
			}
			// if (!user) return;
			// setName("");
			// const promise = saveFolderInformation({
			// 	folderName: name,
			// 	user,
			// 	folderId: parentFolderId || "",
			// });
			// toast.promise(promise, {
			// 	loading: "Creating folder...",
			// 	success: "Create folder successfully",
			// 	error: "Fail to create folder",
			// });
			callback?.();
		},
		[displayName, password, password2]
	);

	useEffect(() => {
		if (!isPasswordMatch && password === password2) {
			setIsPasswordMatch(true);
		}
	}, [isPasswordMatch, password, password2]);

	return (
		<div>
			<Button onClick={onOpen} variant={"flat"}>
				<p className=" font-semibold">Thêm tài khoản</p>
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleAddUser(onClose);
							}}
						>
							<ModalHeader className="flex flex-col gap-1 text-foreground-900">
								Tạo tài khoản mới
							</ModalHeader>
							<ModalBody>
								<div className=" flex flex-col gap-4">
									<Input
										value={displayName}
										onChange={(e) =>
											setDisplayName(e.target.value)
										}
										label="Tên hiển thị"
										labelPlacement="inside"
										required
										isRequired
									/>
									<Input
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										label="Tên đăng nhập"
										labelPlacement="inside"
										required
										isRequired
									/>
									<Select
										label="Favorite Animal"
										placeholder="Select an animal"
										className="max-w-xs"
									>
										{Array.from(Object.values(Role)).map(
											(role) => (
												<SelectItem key={role}>
													<p> {ROLE_ENUM[role]}</p>
												</SelectItem>
											)
										)}
									</Select>
									<div className=" mt-4 flex flex-col gap-4 ">
										<p className=" font-semibold text-foreground-800">
											Cài đặt mật khẩu
										</p>
										<Input
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											type="password"
											label="Mật khẩu"
											labelPlacement="inside"
											required
											isRequired
										/>
										<Input
											value={password2}
											onChange={(e) =>
												setPassword2(e.target.value)
											}
											type="password"
											color={
												isPasswordMatch
													? undefined
													: "danger"
											}
											label="Xác nhận mật khẩu"
											labelPlacement="inside"
											required
											isRequired
										/>
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Hủy
								</Button>
								<Button color="primary" type="submit">
									<p className=" font-semibold">Tạo tài khoản</p>
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
