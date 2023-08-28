'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useState } from 'react';

import './global.css';
import styles from './page.module.css';

import { dummyNouns } from './dummyNouns';

import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner';

import * as gtag from '../lib/gtags';

export default function Home() {
	const [metaphor, setMetaphor] = useState('영감의 원천');

	const [newNoun, setNewNoun] = useState('');

	const queryClient = useQueryClient();

	const { data: nouns, isLoading } = useQuery<string[]>({
		queryKey: ['nouns'],
		queryFn: async () => {
			const { data } = await axios.get('/api/noun');
			return [...new Set([...dummyNouns, data.map((item: { content: string }) => item.content)])];
		},
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

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

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className={styles.wrapper}>
			<div className={styles['sub-wrapper']}>
				<h1 className={styles.title}>은유 기계</h1>
				<p className={styles['metaphor']}>{metaphor}</p>
				<button
					className={styles['creative-button']}
					type="button"
					onClick={() => setMetaphor(getRandomMetaphor(nouns!))}
				>
					새로운 문장을 만들어줘!
				</button>
			</div>
			<div className={styles['sub-wrapper']}>
				<form className={styles.form}>
					<input type="text" style={{ display: 'none' }} />
					<input
						className={styles.input}
						placeholder="명사를 입력해주세요. ex) 꽃"
						value={newNoun}
						onChange={(e) => setNewNoun(e.target.value)}
					/>
					<button
						className={styles['creative-button']}
						type="button"
						onClick={() => {
							if (!isKoreanNoun(newNoun)) {
								alert('한글 명사만 입력해주세요!');
								return;
							}
							mutate(newNoun);
							gtag.event('새로운 명사 추가 버튼 클릭', {
								event_category: 'button click',
								event_label: 'noun',
								value: 1,
							});
							setNewNoun('');
						}}
					>
						먹이주기
					</button>
					<p className={styles['input-desc']}>새로 전달해준 단어는 기계의 동력이 돼요</p>
				</form>
			</div>
			<Link className={styles.maker} href="https://github.com/pione3r" target="__blank">
				기계 제작자
			</Link>
			<Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`} />
			<Script id="google-analytics" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
					gtag('config', '${gtag.GA_TRACKING_ID}', {
						page_path: window.location.pathname,
					});        
				`}
			</Script>
		</div>
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

const isKoreanNoun = (newNoun: string) => {
	const koreanNounPattern = /^[가-힣]+$/;

	return koreanNounPattern.test(newNoun);
};
