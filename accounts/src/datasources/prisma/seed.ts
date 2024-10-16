import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function main() {
  const wardy = await prisma.user.create({
    data: {
      name: "Wardy",
      description: "I'm the travel equivalent of a foodie, I've been everywhere, man",
      username: "wardy",
    },
  });
  const eves = await prisma.user.create({
    data: {
      name: "Eves",
      role: "Host",
      description: "I've been to 15 different planets and decided to make a home for myself and others in my favourites. Each planet and location has its own distinct environment, so read the description carefully. I have equipped them all with the necessary amenities.",
      username: "eves",
    },
  });
  const jackenn = await prisma.user.create({
    data: {
      name: "Jackenn",
      description: "Hello! I'm a friendly citizen of the galaxy, looking for the next cool corner of the universe",
      username: "jackenn",
    },
  });
  const brise = await prisma.user.create({
    data: {
      name: "Brise",
      description: "Brise is my name, logic is my game, as long as your listing is exactly as described you've got a 5 star review coming your way",
      username: "brise",
    },
  });

  console.log({ wardy, eves, jackenn, brise });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
