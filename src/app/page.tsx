'use client';

import { useState } from 'react';

const adjectives = [
	'환상적인',
	'아름다운',
	'야생의',
	'신비로운',
	'강력한',
	'창의적인',
	'우아한',
	'화려한',
	'놀라운',
	'영감을 주는',
	'흥미로운',
	'유쾌한',
	'따뜻한',
	'고요한',
	'열정적인',
	'유능한',
	'낭만적인',
	'용감한',
	'낙천적인',
	'유연한',
	'달콤한',
	'활기찬',
	'귀여운',
	'정열적인',
	'고귀한',
	'모험적인',
	'담담한',
	'친절한',
	'소박한',
	'빈틈없는',
];

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
];

const getRandomIndex = (array: string[]) => Math.floor(Math.random() * array.length);

const getRandomMetaphor = () => `${adjectives[getRandomIndex(adjectives)]} ${nouns[getRandomIndex(nouns)]}`;

export default function Home() {
	const [metaphor, setMetaphor] = useState(getRandomMetaphor());

	return (
		<div>
			<div>{metaphor}</div>
			<button type="button" onClick={() => setMetaphor(getRandomMetaphor())}>
				새로운 문장을 만들어줘!
			</button>
		</div>
	);
}
