'use client';

import { useState } from 'react';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner';

import { styled } from 'styled-components';
import { dummyNouns } from './dummyNouns';

export function EngineV1() {
	const [metaphor, setMetaphor] = useState('영감의 원천');

	const { data: nouns, isLoading } = useQuery<string[]>({
		queryKey: ['nouns'],
		queryFn: async () => {
			const { data } = await axios.get('/api/noun');
			return [...new Set(dummyNouns.concat(data.map((item: { content: string }) => item.content)))];
		},
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	if (isLoading) return <LoadingSpinner />;

	return (
		<Wrapper>
			<MetaphorResult>{metaphor}</MetaphorResult>
			<Button type="button" onClick={() => setMetaphor(getRandomMetaphor(nouns!))}>
				새로운 문장을 만들어줘!
			</Button>
		</Wrapper>
	);
}

const particlesForLastConsonant = ['은', '이', '을'];

const particlesForNoLastConsonant = ['는', '가', '를'];

const getRandomIndex = (array: string[]) => Math.floor(Math.random() * array.length);

const getRandomParticle = (str: string) => {
	// 초성 인덱스 = ((한글 유니코드값 - 0xAC00) / 28) / 21
	// 중성 인덱스 = ((한글 유니코드값 - 0xAC00) / 28) % 21
	// 종성 인덱스 = (한글 유니코드값 - 0xAC00) % 28
	const lastCharUnicode = str.charCodeAt(str.length - 1);
	const isHasLastConsonant = (lastCharUnicode - 0xac00) % 28;
	return isHasLastConsonant
		? particlesForLastConsonant[getRandomIndex(particlesForLastConsonant)]
		: particlesForNoLastConsonant[getRandomIndex(particlesForNoLastConsonant)];
};

const getRandomMetaphor = (nouns: string[]) => {
	const frontWord = nouns[getRandomIndex(nouns)];
	const middleWord = nouns[getRandomIndex(nouns)];
	const backWord = nouns[getRandomIndex(nouns)];

	return `${frontWord}${getRandomParticle(frontWord)} ${middleWord}의 ${backWord}`;
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;
`;

const MetaphorResult = styled.p`
	font-size: 1.5rem;
`;

const Button = styled.button`
	border: 0.125rem solid black;
	border-radius: 0.625rem;

	padding: 0.5rem 1rem;

	transition: all 0.2s;

	&:hover {
		background-color: black;
		color: white;
	}
`;
