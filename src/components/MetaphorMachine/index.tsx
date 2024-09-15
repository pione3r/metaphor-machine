'use client';

import { EngineV1 } from './EngineV1';
import { EngineV2 } from './EngineV2';
import { FeedNounPart } from './FeedNounPart';

import { useRecoilValue } from 'recoil';
import { versionState } from './versionState';

export default function MetaphorMachine() {
	const version = useRecoilValue(versionState);

	return (
		<div className="flex flex-col items-center gap-[2rem]">
			{version === 1 && <EngineV1 />}
			{version === 2 && <EngineV2 />}
			<FeedNounPart />
		</div>
	);
}
