import { prisma } from '$lib/server';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const take = url.searchParams.get('take');

	const activities = await prisma.activities.findMany({
		include: { EventLogs: { take: take ? +take : 10, orderBy: { timestamp: 'desc' } } }
	});

	return json(activities);
};
