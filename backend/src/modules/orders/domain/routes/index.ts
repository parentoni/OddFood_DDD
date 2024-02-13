import mongoose, { models } from "mongoose";
import express from "express";
import { Middleware } from "../../../../shared/infra/http/utils/Middleware";
import { CreateOrderController } from "../../useCases/createOrderUseCase/createOrderController";
import { createOrderUseCase } from "../../useCases/createOrderUseCase";
import { findOrderByIdUseCase } from "../../useCases/findOrderUseCase";
import { FindOrderByIdController } from "../../useCases/findOrderUseCase/findOrderByIdController";
import { findDailyOrdersUseCase } from "../../useCases/getDailyOrders";
import { FindDailyOrdersController } from "../../useCases/getDailyOrders/findDailyOrdersController";
const orderRouter = express.Router()

orderRouter.post("/create", (req, res)=> new CreateOrderController(createOrderUseCase).execute(req, res))
orderRouter.get("/daily", (req, res) => new FindDailyOrdersController(findDailyOrdersUseCase).execute(req, res))

orderRouter.get("/:id", (req, res)=> new FindOrderByIdController(findOrderByIdUseCase).execute(req, res))
export {orderRouter}