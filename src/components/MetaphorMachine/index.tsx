'use client';

import { styled } from 'styled-components';

import { EngineV1 } from './EngineV1';
import { EngineV2 } from './EngineV2';
import { FeedNounPart } from './FeedNounPart';

import { useRecoilValue } from 'recoil';
import { versionState } from './versionState';

export default function MetaphorMachine() {
	const version = useRecoilValue(versionState);

	return (
		<Wrapper>
			{version === 1 && <EngineV1 />}
			{version === 2 && <EngineV2 />}
			<FeedNounPart />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
`;
