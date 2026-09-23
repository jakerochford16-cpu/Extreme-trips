import { PrismaClient } from "@prisma/client";
import { groupForCategory } from "../src/categoryGroups";
import { data } from "./data";

const prisma = new PrismaClient();

async function main() {
  await prisma.activity.deleteMany();
  await prisma.country.deleteMany();

  for (const country of data) {
    await prisma.country.create({
      data: {
        name: country.name,
        slug: country.slug,
        continent: country.continent,
        summary: country.summary,
        heroTag: country.heroTag,
        activities: {
          create: country.activities.map((a) => ({
            title: a.title,
            region: a.region,
            category: a.category,
            categoryGroup: groupForCategory(a.category),
            description: a.description,
            costType: a.costType,
            costEstimate: a.costEstimate,
            currency: a.currency,
            difficulty: a.difficulty,
            riskLevel: a.riskLevel,
            permitRequired: a.permitRequired,
            guideRequired: a.guideRequired,
            bestSeason: a.bestSeason,
            latitude: a.latitude,
            longitude: a.longitude,
            tags: a.tags.join(","),
          })),
        },
      },
    });
  }

  const total = data.reduce((sum, c) => sum + c.activities.length, 0);
  console.log(`Seeded ${data.length} countries, ${total} activities.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
