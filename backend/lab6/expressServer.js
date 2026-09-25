import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import crypto from 'node:crypto'

const port = 3000

const app = express()
app.use(express.json())
app.use(cors())
const array = [
    {
        id: 1,
        name: "Akarsh",
        age: 20
    },
    {
        id: 2,
        name: "Akshat",
        age: 21
    },
    {
        id: 3,
        name: "Ansh",
        age: 17
    }
]
const accounts = []

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.scryptSync(password, salt, 64).toString('hex')
    return `${salt}:${hash}`
}

app.get("/", (req, res) => {
    res.status(200).send(`listening on port ${port}`)
})

app.get("/msg", (req, res) => {
    res.status(200).json({
        message : "Welcome to express server"
    })
})


app.get("/user", (req, res) => {
    try {
        res.status(200).json({
            message: "data recieved",
            userData: array
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.get("/user/:id", (req, res) => {
    try {
        const id = req.params.id ;
        const user = array.find((u)=> u.id == id);
        if(!user){
            return res.status(400).json({message: "user not found"})
        }
        res.status(200).json({message : "user found" , 
            user
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.post("/create" , (req,res)=>{
    try{
        const {name , age} = req.body ;
        const newUser = {
            id: array.length+1,
            name,
            age,
        };
        array.push(newUser);
        console.log("User added successfully")
        console.log(array)
        res.status(201).json({
            message: "User created successfully",
            userData: newUser
        })
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.put("/user/:id", (req, res) => {
    try {
        const id = req.params.id
        const { name, age } = req.body

        const user = array.find((u) => u.id == id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        user.name = name
        user.age = age

        res.status(200).json({
            message: "User updated successfully",
            userData: user
        })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.delete("/user/:id", (req, res) => {
    try {
        const id = req.params.id

        const index = array.findIndex((u) => u.id == id)

        if (index === -1) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const deletedUser = array.splice(index, 1)

        res.status(200).json({
            message: "User deleted successfully",
            userData: deletedUser[0]
        })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

app.post("/signup", (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" })
        }

        const normalizedEmail = email.trim().toLowerCase()
        const existingAccount = accounts.find((account) => account.email === normalizedEmail)

        if (existingAccount) {
            return res.status(409).json({ message: "An account with this email already exists" })
        }

        const account = {
            id: accounts.length + 1,
            name: name.trim(),
            email: normalizedEmail,
            passwordHash: hashPassword(password),
        }
        accounts.push(account)

        res.status(201).json({
            message: "Account created successfully",
            user: {
                id: account.id,
                name: account.name,
                email: account.email,
            },
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: "Internal server error" })
    }
})