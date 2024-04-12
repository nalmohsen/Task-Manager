
import { AppDataSource } from "../data-source"
import { Users } from '../entity/User'
import { Request, Response } from 'express'
import { validationResult, body } from 'express-validator'
import { hash, compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({ path: "./.env" })
const userRepository = AppDataSource.getRepository(Users)


// Create User API
const CreateUser = async (req: Request, res: Response) => {
  try {
    await body('username').notEmpty().isString().withMessage("Username must be a non-empty string").run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, message: errors.array()[0].msg });
    }
    let data = req.body
    const { username, email, password } = data;
    const isRegistered = await userRepository.findOneBy({ 'email': email })
    if (isRegistered) return res.status(400).send({ status: false, message: "Email is already registered" })

    data['password'] = await hash(password, 10)
    const user = await userRepository.save(data)
    return res.status(201).send({ status: true, message: `Welcome aboard, ${username}! Your account has been successfully created.`, user })
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

// Login User API
const Login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: false, message: errors.array()[0].msg });
    }
    const { email, password } = req.body
    const user = await userRepository.findOneBy({ 'email': email })
    if (!user) return res.status(400).send({ status: false, message: "Email is not registered" })

    // Compare the provided password with hashed password
    const pass = await compare(password, user.password)
    if (!pass) return res.status(401).send({ status: false, message: "Invalid password" });

    // Generate a JWT token and include it in the response header
    sign({ userId: user._id }, process.env.SECRET_KEY, (err: any, token: string) => {
      if (err) return res.status(400).send({ status: false, message: err.message })
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none' 
      });
      return res.status(200).send({ status: true, message: `Welcome back, ${user.username} ! You've successfully logged in.` });
    })
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

// User Profile API
const UserProfile = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies
    if (!token) return res.status(400).send({ status: false, message: 'You are not logged in.' })
    let userId: number;
    interface Payload { userId: number }

    verify(token, process.env.SECRET_KEY, (err: any, payload: Payload) => {
      if (err) return res.status(403).send({ status: false, message: err })
      userId = payload.userId;
    })
    const user = await userRepository.findOneBy({ _id: userId })
    if(!user) return res.status(400).send({ status: false, message: 'You are not logged in.' })
    return res.status(200).send({ status: true, user })
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}

// Logout User API
const LogOut=(req:Request,res:Response)=>{
  try {
    res.clearCookie('token');
    return res.status(200).send({ status: true, message: "You have been successfully logged out." });    
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}
export { CreateUser, Login, UserProfile ,LogOut}