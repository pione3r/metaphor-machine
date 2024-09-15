import MetaphorMachine from '@/components/MetaphorMachine';
import { VersionSelectButton } from '@/components/MetaphorMachine/VersionSelectButton';

export default function Home() {
	return (
		<div className="flex flex-col items-center gap-[1rem] pt-[128px] md:pt-[64px]">
			<h1 className=" text-[3rem] font-semibold">은유 기계</h1>
			<MetaphorMachine />
			<VersionSelectButton />
		</div>
	);
}
