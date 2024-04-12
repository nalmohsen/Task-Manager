import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/User";
import { param, validationResult } from "express-validator";
const userRepository = AppDataSource.getRepository(Users)



const Authentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies
        if (!token) return res.status(400).send({ status: false, message: 'You are not logged in.' })
        interface Payload { userId: number }

        verify(token, process.env.SECRET_KEY, (err: any, payload: Payload) => {
            if (err) return res.status(403).send({ status: false, message: err })
            req['userId'] = payload.userId;  // set userId in the request object
            next()
        })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


const Authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await param('userId').isInt().withMessage('Invalid userId').run(req)
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send({ status: false, message: errors.array()[0].msg });
        const { userId } = req.params;
        const user = await userRepository.findOne({ where: { _id: parseInt(userId) } });
        if (!user) return res.status(404).send({ status: false, message: "User not found" });
        if (req['userId'] !== parseInt(userId)) {
            return res.status(403).send({ status: false, message: "Access denied" });
        }
        next()
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

export { Authentication, Authorization }