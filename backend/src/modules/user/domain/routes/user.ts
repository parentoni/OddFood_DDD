import express from "express";
import { FindUserByIdUseCase } from "../../useCase/findUserById/findUserByIdUseCase";
import { FindUserByIdController } from "../../useCase/findUserById/findUserByIdController";
import { userRepo } from "../../repository";
const userRouter = express.Router()

userRouter.post("/:id", (req, res)=> new FindUserByIdController( new FindUserByIdUseCase(userRepo)).execute(req, res))

export {userRouter}
