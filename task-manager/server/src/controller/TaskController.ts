
import { LessThan, Like, MoreThan } from "typeorm";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";
import { Users } from "../entity/User";
import { Request, Response } from "express";
import { validationResult } from 'express-validator'


const taskRepository = AppDataSource.getRepository(Task)
const userRepository = AppDataSource.getRepository(Users)

// Create Task API
const createTask = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send({ status: false, message: errors.array()[0].msg });

        const data = req.body
        const { userId } = req.params
        const user = await userRepository.findOne({ where: { _id: parseInt(userId) } });
        if (!user) return res.status(404).send({ status: false, message: "User not found" });
        data.user = user
        const task = await taskRepository.save(data)
        return res.status(201).send({ status: true, message: 'Task created successfully.', task })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

// Get Tasks API
const getTasks = async (req: Request, res: Response) => {
    try {
        const { query, sort, searchQuery } = req.query
        const { userId } = req.params

        // Initialize the filter with the user
        let filter: any = {
            status: false,
            user: { _id: parseInt(userId) },
            task: Like(`%${searchQuery}%`)
        }
        const today = new Date().toISOString().split('T')[0];  // "2023-09-01"

        switch (query) {
            case "My Day": filter = { dateScheduled: today, ...filter }
                break;
            case "Importance": filter = { isImp: true, ...filter }
                break;
            case "Planned": filter = { dateScheduled: MoreThan(today), ...filter }
                break;
            case "Completed": filter = { status: true, user: { _id: userId }, task: Like(`%${searchQuery}%`) }
                break;
            case "Overdue": filter = { dateScheduled: LessThan(today), ...filter }
                break;
            case 'Tasks': filter = { user: { _id: userId }, task: Like(`%${searchQuery}%`) }
                break;
            default: filter = { dateScheduled: today, ...filter }
        }

        // Initialize the order object
        let order = {}
        switch (sort) {
            case 'isImp': order = { isImp: 'DESC' }
                break;
            case 'dateScheduled': order = { dateScheduled: 'ASC' }
                break;
            case 'createdAt': order = { createdAt: 'ASC' }
                break;
            default: order = { createdAt: 'ASC' }
        }

        const tasks = await taskRepository.find({
            where: filter,
            order: order
        })
        if (tasks.length == 0) return res.status(404).send({ status: false, message: 'Task not found.' });
        return res.status(200).send({ status: true, data: tasks })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


// Update Task API
const UpdateTask = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send({ status: false, message: errors.array()[0].msg });

        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please provide data for update." })
        const taskId = parseInt(req.params.taskId)
        const updateTask = await taskRepository.update({ _id: taskId }, data)
        return res.status(200).send({ status: true, message: "task upadated successfully", updateInfo: updateTask })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


export { createTask, getTasks, UpdateTask }