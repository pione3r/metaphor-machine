import ReactQueryProvider from '@/lib/ReactQueryProvider';
import RecoilProvider from '@/lib/RecoilProvider';
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head />
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
