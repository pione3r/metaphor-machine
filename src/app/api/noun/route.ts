import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const json = await request.json();

		const noun = await prisma.noun.create({
			data: json,
		});

		return new NextResponse(JSON.stringify(noun), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error) {
			return new NextResponse('Create Fail', {
				status: 401,
			});
		}
		return new NextResponse(error.message, { status: 500 });
	}
}

export async function GET() {
	const nouns = await prisma.noun.findMany();

	if (!nouns) {
		return new NextResponse('No user Nouns found', { status: 404 });
	}

	return NextResponse.json(nouns);
}
