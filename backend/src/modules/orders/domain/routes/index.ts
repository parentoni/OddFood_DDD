import mongoose, { models } from "mongoose";
import express from "express";
import { Middleware } from "../../../../shared/infra/http/utils/Middleware";
import { CreateOrderController } from "../../useCases/createOrderUseCase/createOrderController";
import { createOrderUseCase } from "../../useCases/createOrderUseCase";

const orderRouter = express.Router()

orderRouter.post("/create", (req, res)=> new CreateOrderController(createOrderUseCase).execute(req, res))

export {orderRouter}