'use client';

import { useState } from 'react';

const nouns = [
	'꽃',
	'산',
	'바다',
	'별',
	'햇살',
	'숲',
	'강',
	'모래',
	'하늘',
	'바람',
	'책',
	'음악',
	'예술',
	'사랑',
	'꿈',
	'별명',
	'모험',
	'행운',
	'시간',
	'세상',
	'과거',
	'미래',
	'인생',
	'이야기',
	'정원',
	'고요',
	'새벽',
	'일몰',
	'반딧불이',
	'도시',
	'나',
	'너',
	'귀뚜라미',
	'코스모스',
	'집',
	'밤',
	'눈',
	'사람',
	'마음',
	'거리',
	'얼굴',
	'소리',
	'아침',
	'가을',
	'생각',
	'불',
	'어둠',
	'달',
	'봄',
	'아이',
	'방',
	'노래',
	'나무',
	'손',
	'그림자',
	'길',
	'눈물',
	'돌',
	'기차',
	'끝',
	'언덕',
	'저녁',
	'어머니',
	'머리',
	'물결',
	'겨울',
	'코',
	'조개',
	'포기',
	'햇님',
	'햇빛',
	'황혼',
	'단풍',
	'강물',
	'편지',
	'비',
	'고향',
	'닭',
	'꽃밭',
	'구름',
	'잎',
	'마을',
	'지붕',
	'나비',
	'발',
	'전차',
	'성벽',
	'해바라기',
	'시계',
	'전등',
	'글씨',
	'울음',
	'뼈',
	'젊은이',
	'남대문',
	'간판',
	'세계',
	'창',
	'논',
	'여름',
	'공부',
	'안개',
	'바구니',
	'혼자',
	'땅',
	'춤',
	'터널',
	'지도',
	'자국',
	'처음',
	'감자',
	'시대',
	'우주',
	'계절',
	'달걀',
	'연기',
	'굴뚝',
	'종이',
	'죽음',
	'물',
	'물감',
	'처마',
	'병아리',
	'달빛',
	'돌담',
	'걱정',
	'비둘기',
	'공기',
	'민들레',
	'살구나무',
	'십자가',
	'흙',
	'손가락',
	'뒷골목',
	'진달래',
	'문살',
	'바닷가',
	'바위',
	'슬픔',
	'번개',
	'잔디밭',
	'나뭇가지',
	'노트',
];

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

const getRandomMetaphor = () => {
	const frontWord = nouns[getRandomIndex(nouns)];
	const middleWord = nouns[getRandomIndex(nouns)];
	const backWord = nouns[getRandomIndex(nouns)];

	return `${frontWord}${getRandomParticle(frontWord)} ${middleWord}의 ${backWord}`;
};

export default function Home() {
	const [metaphor, setMetaphor] = useState('은유 기계');

	return (
		<div>
			<div>{metaphor}</div>
			<button type="button" onClick={() => setMetaphor(getRandomMetaphor())}>
				새로운 문장을 만들어줘!
			</button>
		</div>
	);
}
