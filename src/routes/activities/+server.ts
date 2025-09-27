// import { prisma } from '$lib/server';
import { PrismaClient } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ url }) => {
	const take = url.searchParams.get('take');

	const activities = await prisma.activities.findMany({
		include: { EventLogs: { take: take ? +take : 10, orderBy: { timestamp: 'desc' } } }
	});

	return json(activities);
};
