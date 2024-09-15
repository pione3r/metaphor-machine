import Link from 'next/link';
import Script from 'next/script';

import ReactQueryProvider from '@/lib/ReactQueryProvider';
import RecoilProvider from '@/lib/RecoilProvider';
import * as gtag from '@/lib/gtags';

import './global.css';

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
						{children}
						<Link
							className="fixed right-[3.125rem] bottom-[3.125rem]"
							href="https://github.com/pione3r"
							target="__blank"
						>
							기계 제작자
						</Link>
						<Script
							strategy="afterInteractive"
							src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
						/>
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
					</ReactQueryProvider>
				</RecoilProvider>
			</body>
		</html>
	);
}
