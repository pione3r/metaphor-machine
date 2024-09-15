'use client';

import { useState } from 'react';

import axios from 'axios';

export function EngineV2() {
	const [metaphor, setMetaphor] = useState('영감의 원천');

	const [twoNouns, setTwoNouns] = useState('');

	return (
		<div className="flex flex-col items-center gap-[1.5rem]">
			<p className="text-[1.5rem] md:max-w-[250px] md:text-[1.3rem] break-keep text-center">{metaphor}</p>
			<input
				className="p-[0.3rem,0.5rem]"
				placeholder="ex) 새벽, 밤"
				value={twoNouns}
				onChange={(e) => setTwoNouns(e.target.value)}
			/>
			<button
				className="border-[0.125rem] rounded-[0.625rem] p-[0.5rem,1rem] transition-all duration-200 hover:bg-black hover:text-white"
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
			</button>
		</div>
	);
}
