'use client';

import { useRecoilState } from 'recoil';
import { versionState } from './versionState';

export function VersionSelectButton() {
	const [version, setVersion] = useRecoilState(versionState);

	return (
		<button
			className="fixed left-[2.5rem] bottom-[2.5rem] border-[0.125rem] rounded-[0.625rem] p-[0.5rem,1rem] transition-all duration-200 hover:bg-black hover:text-white"
			type="button"
			onClick={() => setVersion((prev) => (prev === 1 ? 2 : 1))}
		>{`현재 버전 : ${version}`}</button>
	);
}
