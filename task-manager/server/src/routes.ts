import express from 'express'
const route = express.Router()

import { UpdateTask, createTask, getTasks } from './controller/TaskController';
import { CreateUser, LogOut, Login, UserProfile } from './controller/UserController';
import { Authentication, Authorization } from './middleware/Auth';
import { validateUser, validateCreateTaskApi, validateUpdateTaskApi, validateGetTaskApi } from './middleware/DataValidation';


// USER API's
route.post("/register", validateUser, CreateUser)
route.post("/login", validateUser, Login)
route.get("/profile", UserProfile)
route.put('/logout', LogOut)

// TASK API's
route.post(
    "/createTask/:userId",
    validateCreateTaskApi,
    Authentication,
    Authorization,
    createTask
)
route.get(
    "/tasks/:userId",
    validateGetTaskApi,
    Authentication,
    Authorization,
    getTasks
)
route.put(
    "/task/:taskId/:userId",
    validateUpdateTaskApi,
    Authentication,
    Authorization,
    UpdateTask
)


export default route;