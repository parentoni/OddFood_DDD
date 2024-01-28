import mongoose, { models } from "mongoose";
import express from "express";
import { CreateUserController } from "../../useCase/createUser/CreateUserController";
import { CreateUserUseCase } from "../../useCase/createUser/CreateUserUseCase";
import { UserRepo } from "../../repository/userRepo";
import { authService } from "../../services";

const authRouter = express.Router()

authRouter.post("/register", (req, res)=> new CreateUserController(new CreateUserUseCase(new UserRepo()), authService).execute(req,res))

export {authRouter}