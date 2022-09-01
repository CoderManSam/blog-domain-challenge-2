const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
  const alice = await prisma.user.create({
    data: {
        username: 'AliceTheWonder',
        email: 'alice@wonderland.com',
        password: 'verysecurepassword',
        profile: {
            create: {
                firstName: 'Alice',
                lastName: 'Liddell',
                age: 19,
                pictureUrl: 'exampleUrl'
            }
        },
        posts: {
            create: [
                {  title: "Cool post", content: "Bland and boring", imageUrl: "example url"},
                {  title: "Really cool post", content: "Even worse", imageUrl: "example url"}
            ]
        }
    } ,
    include: {
        profile: true,
        posts: true
    }   
  })

//   const bob = await prisma.user.upsert({
//     where: { email: 'bob@prisma.io' },
//     update: {},
//     create: {
//       email: 'bob@prisma.io',
//       name: 'Bob',
//       posts: {
//         create: [
//           {
//             title: 'Follow Prisma on Twitter',
//             content: 'https://twitter.com/prisma',
//             published: true,
//           },
//           {
//             title: 'Follow Nexus on Twitter',
//             content: 'https://twitter.com/nexusgql',
//             published: true,
//           },
//         ],
//       },
//     },
//   })
  console.log({ alice})
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })