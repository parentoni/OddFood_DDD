import mongoose, { models } from "mongoose";
import express from "express";
import { CreateUserController } from "../../useCase/createUser/CreateUserController";
import { CreateUserUseCase } from "../../useCase/createUser/CreateUserUseCase";
import { UserRepo } from "../../repository/userRepo";
import { authService } from "../../services";
import { FindUserByIdUseCase } from "../../useCase/findUserById/findUserByIdUseCase";
import { FindUserByIdController } from "../../useCase/findUserById/findUserByIdController";
const userRouter = express.Router()

userRouter.post("/get/:id", (req, res)=> new FindUserByIdController( new FindUserByIdUseCase(new UserRepo(models))).execute(req, res))

export {userRouter}