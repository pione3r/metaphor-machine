import ReactQueryProvider from '@/lib/ReactQueryProvider';
import RecoilProvider from '@/lib/RecoilProvider';
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Metaphor Machine',
	description: 'This is Metaphor Machine.. R.I.P Eco',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head>
				<meta name="google-site-verification" content="HWc0XbjZTgIgX4xEb3homtanP4xZlGRFA9biIl76SJA" />
			</head>
			<body>
				<RecoilProvider>
					<ReactQueryProvider>
						<StyledComponentsRegistry>{children}</StyledComponentsRegistry>
					</ReactQueryProvider>
				</RecoilProvider>
			</body>
		</html>
	);
}
