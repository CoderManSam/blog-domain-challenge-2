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
            }
        },
        include: {
            profile: true
        }    
    })

    const alicesFirstPostWithCategories = await prisma.post.create({
        data: {
            title: 'Alice in Wonderland',
            content: 'How about Alice in Wonderland huh?',
            imageUrl: 'example url',
            authorId: alice.id,
            categories: {
                create: [
                    {name: 'Film'},
                    {name: 'Animation'}
                ]
            }
        },
        include: {
            categories: true
        } 
    })

    const alicesSecondPostWithCategories = await prisma.post.create({
        data: {
            title: 'Alice in Wonderland Through The Looking Glass',
            content: 'Another one?!',
            imageUrl: 'example url',
            authorId: alice.id,
            categories: {
                create: [
                    {name: 'Live action'},
                    {name: 'Time Burton'}
                ]
            }
        },
        include: {
            categories: true
        } 
    })



    const aliceSecondPostCommentChain = await prisma.comment.create({
        data: {
           content: 'Second best film ever!' ,
            post: {
              connect: {
                id: alicesSecondPostWithCategories.id
              }
            },
            author: {
                connect: {
                    id: alice.id
                }    
            }
        }
    })
  

    const aliceSecondPostCommentReply = await prisma.comment.create({
        data: {
            content: 'Only second best?!',
            post: {
                connect: {
                  id: alicesSecondPostWithCategories.id
                }
              },
            author: {
                  connect: {
                      id: alice.id
                  }    
            },
            replies: {
                connect: [
                    {id: aliceSecondPostCommentChain.id}
                ]
            }
        },
        include: {
            replies: true
        } 
    })
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

//   const alice = await prisma.user.create({
//     data: {
//         username: 'AliceTheWonder',
//         email: 'alice@wonderland.com',
//         password: 'verysecurepassword',
//         profile: {
//             create: {
//                 firstName: 'Alice',
//                 lastName: 'Liddell',
//                 age: 19,
//                 pictureUrl: 'exampleUrl'
//             }
//         },
//         posts: {
//             // create: [
//             //     {  
//             //         title: "Cool post", 
//             //         content: "Bland and boring", 
//             //         imageUrl: "example url",
//             //         categories: {
                        
//                         create: [
//                             {category: {name: "bland"}},
//                             {category: {name: "boring"}}
//                         ],
//                         // connectOrCreate: {
//                         //     where: {
//                         //         name: "bland"
//                         //     },
//                         //     create: {
//                         //         name: "bland"
//                         //     }
//                         // }
//                         // create: [
//                         //     {name: "bland"},
//                         //     {name: "boring"}
//                         // ]
//                 //     }
//                 // },
//                 // {  
//                 //     title: "Really cool post", 
//                 //     content: "Even worse", 
//                 //     imageUrl: "example url",
//                     // categories: {
//                     //     create: [
//                     //         {name: "very bland"},
//                     //         {name: "very boring"}
//                     //     ]
//                     // }
//                 // },
//             // ],
//             include: {
//                 categories: true
//             }
//         }
//     } ,
//     include: {
//         profile: true,
//         posts: true
//     }   
//   })

//   const createCategory = await prisma.post.create({
//     data: {
//       title: 'How to be Bob',
//       categories: {
//         create: [
//           {
//             category: {
//               create: {
//                 name: 'bland',
//               },
//             },
//           },
//         ],
//       },
//     },
//   })

//   const createAnotherCategory = await prisma.post.create({
//     data: {
//       title: 'How to be Bob',
//       categories: {
//         create: [
//           {
//             category: {
//               create: {
//                 name: 'boring',
//               },
//             },
//           },
//         ],
//       },
//     },
//   })

// //   const bob = await prisma.user.upsert({
// //     where: { email: 'bob@prisma.io' },
// //     update: {},
// //     create: {
// //       email: 'bob@prisma.io',
// //       name: 'Bob',
// //       posts: {
// //         create: [
// //           {
// //             title: 'Follow Prisma on Twitter',
// //             content: 'https://twitter.com/prisma',
// //             published: true,
// //           },
// //           {
// //             title: 'Follow Nexus on Twitter',
// //             content: 'https://twitter.com/nexusgql',
// //             published: true,
// //           },
// //         ],
// //       },
// //     },
// //   })
//   console.log({ alice})
// }