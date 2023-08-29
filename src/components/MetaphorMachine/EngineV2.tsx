'use client';

import { useState } from 'react';

import axios from 'axios';

import { styled } from 'styled-components';

export function EngineV2() {
	const [metaphor, setMetaphor] = useState('영감의 원천');

	const [twoNouns, setTwoNouns] = useState('');

	return (
		<Wrapper>
			<MetaphorResult>{metaphor}</MetaphorResult>
			<Input placeholder="ex) 새벽, 밤" value={twoNouns} onChange={(e) => setTwoNouns(e.target.value)} />
			<Button
				type="button"
				onClick={async () => {
					const koreanNounListPattern = /^([가-힣]+, )*[가-힣]+$/;

					if (!koreanNounListPattern.test(twoNouns)) {
						alert("'새벽, 밤' 등의 형식으로 입력해주세요!");
						return;
					}

					try {
						const { data } = await axios.post('api/metaphor', JSON.stringify({ twoNouns }));
						setMetaphor(data.metaphor);
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} catch (err: any) {
						if (err.response.status === 400) setMetaphor(err.response.data);
					}
				}}
			>
				새로운 문장을 만들어줘!
			</Button>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;
`;

const MetaphorResult = styled.p`
	font-size: 1.5rem;

	@media screen and (max-width: 720px) {
		max-width: 250px;

		font-size: 1.3rem;
		word-break: keep-all;
		text-align: center;
	}
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
