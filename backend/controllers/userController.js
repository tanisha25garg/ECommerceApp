import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = ( id ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async ( req, res ) => {
    try {
        const { email, password } = req.body

        // Check if user exists
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exists" })
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' })
        }
        
        const token = createToken(user._id)
        res.status(200).json({ success: true, message: 'User Logged In Successfully', token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

// Route for user registration
const registerUser = async ( req, res ) => {
    try {
        const { name, email, password } = req.body
        
        // Check if user already exists
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(400).json({ success: false, message: 'User already exists' })
        }

        // Validate email format and password strength
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please Enter a valid Email' })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ success: false, message: 'Please Enter a strong password' })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.status(201).json({ success: true, message: 'User Created Successfully', token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

// Route for Admin login
const adminLogin = async ( req, res ) => {
    try {
        const { email, password } = req.body
        
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.status(200).json({ success: true, message: 'Admin Logged In Successfully', token })
        } else {
            return res.status(400).json({ success: false, message: 'Invalid Credentials' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

export { loginUser, registerUser, adminLogin }
