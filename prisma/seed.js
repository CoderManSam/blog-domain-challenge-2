const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
    // const alicesFirstPostWithCategories = await prisma.post.create({
    //     data: {
    //         title: 'Alice in Wonderland',
    //         content: 'How about Alice in Wonderland huh?',
    //         imageUrl: 'example url',
    //         categories: {
    //             create: [
    //                 {name: 'Film'},
    //                 {name: 'Animation'}
    //             ]
    //         }
    //     }
    // })

    // const alicesSecondPostWithCategories = await prisma.post.create({
    //     data: {
    //         title: 'Alice in Wonderland Through The Looking Glass',
    //         content: 'Another one?!',
    //         imageUrl: 'example url',
    //         categories: {
    //             create: [
    //                 {name: 'Live action'},
    //                 {name: 'Time Burton'}
    //             ]
    //         }
    //     }
    // })

    const filmCategory = await prisma.category.create({
        data: {
            name: 'film'
        }
    })   
    
    const animationCategory = await prisma.category.create({
        data: {
            name: 'animation'
        }
    })  

    const firstPost = await prisma.post.create({
        data: {
            title: 'Alice in Wonderland',
            content: 'How about Alice in Wonderland huh?',
            imageUrl: 'example url',
            categories: {
                connect: [
                    {id: filmCategory.id},
                    {id: animationCategory.id}
                ]
            }
        },
        include: {
            categories: true
        }
    })

    const secondPost = await prisma.post.create({
        data: {
            title: 'Alice in Wonderland Through The Looking Glass',
            content: 'Another one?!',
            imageUrl: 'example url',
            categories: {
                connect: [
                    {id: filmCategory.id},
                    {id: animationCategory.id}
                ]
            }
        },
        include: {
            categories: true
        }
    })

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
                connect: [
                    {id: firstPost.id},
                    {id: secondPost.id}
                ]
            }
        },
        include: {
            profile: true,
            posts: true
        }    
    })
}  

// async function seed() {
//     // create a category or two so that we can "tag" a post with the right category
//     const programmingCategory = await prisma.category.create(...) // programmingCategory.id will now point to the correct ROW in the Category table
//     const generalCategory = await prisma.category.create(...)
    
//     // now create 2 posts, one will have 2 categories, the other will not
//     const firstPost = await prisma.post.create({... HERE you link the post to the programmingCateogry via programmingCategory.id ...})
//     // for secondPost you link 2 categories, not just one
// }

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