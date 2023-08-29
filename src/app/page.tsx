import styles from './page.module.css';

import MetaphorMachine from '@/components/MetaphorMachine';

import { VersionSelectButton } from '@/components/MetaphorMachine/VersionSelectButton';

export default function Home() {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>은유 기계</h1>
			<MetaphorMachine />
			<VersionSelectButton />
		</div>
	);
}
