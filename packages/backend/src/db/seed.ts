import { PrismaClient } from '@prisma/client';
import path from 'path';

const prisma = new PrismaClient();

const tables = ['Unit', 'Category', 'Food', 'Nutrient', 'NutrientAmount'];

async function seed() {
  for (const table of tables) {
    console.log(`seeding ${table}.csv...`);
    await prisma.$executeRawUnsafe(
      `\copy "${table}" from '${path.resolve(
        'src/lib/prisma/data/' + table + '.csv'
      )}' delimiter ',' CSV`
    );
    console.log(`${table}.csv seeded`);
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
