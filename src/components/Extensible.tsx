"use client";

import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";

import { ReactNode } from "react";

import EXTEND_ICON from "@assets/extend.svg";
import Image from "next/image";

export default function Extensible({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<div className="relative h-full flex flex-col">
			{children}
			<Button
				isIconOnly
				onPress={onOpen}
				size="sm"
				color="primary"
				className="absolute top-0 -right-0"
			>
				<Image src={EXTEND_ICON} width={14} height={14} alt="button" />
			</Button>
			<Modal
				size="full"
				className="h-full"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent className="h-full">
					{(onClose) => (
						<>
							<ModalBody className="h-full">{children}</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
