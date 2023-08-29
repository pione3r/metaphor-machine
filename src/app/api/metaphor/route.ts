import { NextResponse } from 'next/server';

import { dummyMetaphors } from './dummyMetaphors';

export async function POST(request: Request) {
	try {
		const { twoNouns }: { twoNouns: string } = await request.json();

		const [word1, word2] = twoNouns.split(', ');

		const filteredMetaphors = dummyMetaphors.filter((item) => item.includes(word1) && item.includes(word2));

		if (!filteredMetaphors.length) throw new Error('제 서랍에는 없는 문장이에요 ㅠㅠ');

		const randomPickMetaphor = filteredMetaphors[Math.floor(Math.random() * filteredMetaphors.length)];

		return new NextResponse(JSON.stringify({ metaphor: randomPickMetaphor }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error) {
			return new NextResponse(error.message, {
				status: 400,
			});
		}
		return new NextResponse(error.message, { status: 500 });
	}
}
