import dynamic from "next/dynamic";
const SearchBar = dynamic(() => import("@/components/SearchBar"));
const FeatureCard = dynamic(() => import("@/components/FeatureCard"));
import { HOME_INTRODUCTION } from "@/constants/home_introduction";
import { Suspense } from "react";

export default async function Home() {
	return (
		<div>
			<Suspense fallback={<p>Loading searchbar...</p>}>
				<SearchBar />
			</Suspense>
			<div className="text-gray-400 columns-2 gap-14 mt-52 px-20">
				{HOME_INTRODUCTION.map((introduction) => (
					<Suspense
						key={introduction.title.link}
						fallback={<p>Loading feature</p>}
					>
						<FeatureCard introduction={introduction} />
					</Suspense>
				))}
			</div>
		</div>
	);
}
