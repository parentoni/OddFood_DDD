import express from "express";
import { CreateUserController } from "../../useCase/createUser/CreateUserController";
import { CreateUserUseCase } from "../../useCase/createUser/CreateUserUseCase";
import { authService } from "../../services";
import { userRepo } from "../../repository";
const authRouter = express.Router()

authRouter.post("/register", (req, res)=> new CreateUserController(new CreateUserUseCase(userRepo), authService).execute(req,res))

export {authRouter}
