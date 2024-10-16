import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const wardy = await prisma.user.create({
    data: {
      name: "Wardy",
      username: "wardy"
    }
  })
  const eves = await prisma.user.create({
    data: {
      name: "Eves",
      role: "host",
      username: "eves"
    }
  })
  const jackenn = await prisma.user.create({
    data: {
      name: "Jackenn",
      username: "jackenn"
    }
  })
  const brise = await prisma.user.create({
    data: {
      name: "Brise",
      username: "brise"
    }
  })

  const chat = await prisma.conversation.create({
    data: {
      id: "wardy-eves-chat",
      participants: {
        create: [
         {
           participant: {
             connect: {
               username: eves.username
             }
           }
         },
         {
           participant: {
             connect: {
               username: wardy.username
             }
           }
         }
        ]
       }
    }
  })

  console.log({ eves, wardy, brise, jackenn, chat })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })