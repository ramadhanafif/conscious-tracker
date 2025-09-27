import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seeder() {
	await prisma.activityCategories.create({
		data: {
			name: faker.word.verb(),
			Activities: {
				create: [
					{
						title: faker.word.verb(),
						EventLogs: {
							create: [{ event: 'start', timestamp: faker.date.recent() }, { event: 'stop' }]
						}
					},
					{
						title: faker.word.verb(),
						EventLogs: {
							create: [{ event: 'start', timestamp: faker.date.recent() }]
						}
					}
				]
			}
		}
	});
}

seeder()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
