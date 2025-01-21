import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  const users = Array.from({ length: 10 }).map(() => ({
    uuid: uuidv4(),
    email: faker.internet.email(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
  }))

  for (const userData of users) {
    await prisma.user.create({
      data: userData,
    })
  }

  console.log('10 users successfully registered!')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
