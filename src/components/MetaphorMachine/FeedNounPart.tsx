'use client';

import { useState } from 'react';

import { styled } from 'styled-components';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { event } from '@/lib/gtags';

export function FeedNounPart() {
	const [noun, setNoun] = useState('');

	const isKoreanNoun = (newNoun: string) => {
		const koreanNounPattern = /^[가-힣]+$/;

		return koreanNounPattern.test(newNoun);
	};

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (noun: string) => axios.post('/api/noun', { content: noun }),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['nouns'] });
			alert('냠냠');
		},
		onError: (err: AxiosError) => {
			if (err.response?.status === 401) alert('먹지 못했어요.. 401');
			if (err.response?.status === 500) alert('먹지 못했어요.. 500');
		},
	});

	return (
		<Wrapper>
			<input type="text" style={{ display: 'none' }} />
			<Input placeholder="명사를 입력해주세요. ex) 꽃" value={noun} onChange={(e) => setNoun(e.target.value)} />
			<Button
				type="button"
				onClick={() => {
					if (!isKoreanNoun(noun)) {
						alert('한글 명사만 입력해주세요!');
						return;
					}
					mutate(noun);
					event('새로운 명사 추가 버튼 클릭', {
						event_category: 'button click',
						event_label: 'noun',
						value: 1,
					});
					setNoun('');
				}}
			>
				먹이주기
			</Button>
			<Desc>새로 전달해준 단어는 기계의 동력이 돼요</Desc>
		</Wrapper>
	);
}

const Wrapper = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

const Input = styled.input`
	padding: 0.3rem 0.5rem;
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

const Desc = styled.p`
	color: #868686;

	font-size: 0.8rem;
`;
