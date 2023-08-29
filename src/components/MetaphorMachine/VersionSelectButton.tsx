'use client';

import { useRecoilState } from 'recoil';
import { versionState } from './versionState';
import { styled } from 'styled-components';

export function VersionSelectButton() {
	const [version, setVersion] = useRecoilState(versionState);

	return (
		<Button type="button" onClick={() => setVersion((prev) => (prev === 1 ? 2 : 1))}>{`현재 버전 : ${version}`}</Button>
	);
}

const Button = styled.button`
	position: fixed;
	left: 2.5rem;
	bottom: 2.5rem;

	border: 0.125rem solid black;
	border-radius: 0.625rem;

	padding: 0.5rem 1rem;

	transition: all 0.2s;

	&:hover {
		background-color: black;
		color: white;
	}
`;
