import { Router } from "express";
import usersController from "../controllers/users.js";

const usersRouter= Router()

usersRouter.post("/signUp", usersController.register)
usersRouter.post("/sign-in", usersController.login)



export default usersRouter                