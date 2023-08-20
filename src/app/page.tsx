// import FeatureCard from "@/components/FeatureCard";
// import SearchBar from "@/components/SearchBar";
import dynamic from "next/dynamic";
const SearchBar = dynamic(() => import("@/components/SearchBar"));
const FeatureCard = dynamic(() => import("@/components/FeatureCard"));
import { HOME_INTRODUCTION } from "@/constants/home_introduction";

export default async function Home() {
	return (
		<div>
			<SearchBar />
			<div className="text-gray-400 columns-2 gap-14 mt-52 px-20">
				{HOME_INTRODUCTION.map((introduction) => (
					<FeatureCard
						key={introduction.title.link}
						introduction={introduction}
					/>
				))}
			</div>
		</div>
	);
}
