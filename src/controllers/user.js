const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createUser = async (req, res) => {
    const {
        username,
        email,
        password,
        firstName,
        lastName,
        age,
        pictureUrl
    } = req.body

    // error not working, skips the if, creates the user then goes back to the if and errors

    // const allUsers = await prisma.user.findMany()

    // const sameUsername = allUsers.find(user => user.username = username)
    // const sameEmail = allUsers.find(user => user.email = email)

    // console.log("same user", sameUsername)
    // console.log("same email", sameEmail)


    // if(sameUsername || sameEmail) {
    //     return res.status(409).json({
    //         error: "A movie with the provided username/email already exists"
    //     })
    // }

     if (!username || !email || !password || !firstName || !lastName || !pictureUrl ||!(age >= 0)) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }



    else {
        const createdUser = await prisma.user.create({
            data: {
                username,
                email,
                password,
                profile: {
                    create: {
                        firstName, 
                        lastName, 
                        pictureUrl,
                        age
                    }
                }
            },
            include: {
                profile: true
            }
        })
    
        res.status(201).json({ user: createdUser })
    }
}    

const updateUser = async (req, res) => {
    const {id} = req.params
    const idAsNumber = Number(id)

    const {
        username,
        email,
        password,
        firstName,
        lastName,
        age,
        pictureUrl
    } = req.body

    const allUsers = await prisma.user.findMany()

    const sameId = allUsers.find(user => user.id = idAsNumber)
    // const sameUsername = allUsers.find(user => user.username = username)
    // const sameEmail = allUsers.find(user => user.email = email)

    // console.log("same user", sameUsername)
    // console.log("same email", sameEmail)

    // error not working, expectes to find the parentId though the if error should stop it before getting that far
    if(!sameId){
        return res.status(404).json({
            error: "A user with that id does not exist"
        })
    }

    // if(sameUsername || sameEmail) {
    //     return res.status(409).json({
    //         error: "A movie with the provided username/email already exists"
    //     })
    // }

    else { const updateUser = await prisma.user.update({
        where: {
            id: idAsNumber,
        },
        data: {
            username,
            email,
            password,
            profile: {
                update: {
                    firstName,
                    lastName,
                    age,
                    pictureUrl
                }
            }
        },
        include: {
            profile: true
        }
    })

    res.status(201).json({
        user: updateUser
    })
    }  
}    

module.exports = {
    createUser,
    updateUser
}