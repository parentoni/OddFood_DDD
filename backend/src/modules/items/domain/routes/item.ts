import mongoose, { models } from "mongoose";
import express from "express";
import { CreateItemController } from "../../useCases/createItemUseCase/createItemController";
import { CreateItemUseCase } from "../../useCases/createItemUseCase/createItemUseCase";
import { ItemRepo } from "../../repository/itemRepo";
import { GetAllItemsController } from "../../useCases/getItemsUseCase/getAllItemsController";
import { GetAllItemsUseCase } from "../../useCases/getItemsUseCase/getAllItemsUseCase";

const itemRouter = express.Router()

itemRouter.post("/:id", (req, res)=> new CreateItemController( new CreateItemUseCase(new ItemRepo())).execute(req, res))
itemRouter.get("/all", (req, res) => new GetAllItemsController(new GetAllItemsUseCase(new ItemRepo())).execute(req, res))
export {itemRouter}