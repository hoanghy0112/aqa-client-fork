import { ReactNode } from "react";

export default function BaseChart({ children }: { children: ReactNode }) {
	// bg-[url(https://www.tremor.so/grid.svg)]
	return (
		<div className="w-full h-fit">
			<div className="absolute w-full h-full opacity-20 bg-repeat">
				{children}
			</div>
			<div className="relative w-full h-fit">{children}</div>
		</div>
	);
}
