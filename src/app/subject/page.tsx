// "use client";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { tabs } from "./(main)/layout";

export default function SubjectPage() {
	// const router = useRouter();

	// useEffect(() => {
	// 	tabs.forEach(({ link }) => router.prefetch(`/subject/${link}`));
	// }, [router]);

	redirect("/subject/average-point");
}
