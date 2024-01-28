import mongoose, { Model } from "mongoose";
import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
import { IItemRepo } from "./IItemRepo";
import { IItem, IItemNoId } from "../../../shared/infra/database/models/Item";
import { left, right } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { ItemModel } from "../../../shared/infra/database/models/Item";
export class ItemRepo implements IItemRepo {
    

    public async save(filter : {dto : IItem}) : RepositoryBaseResult<null> {
        try {
            const exists = await ItemModel.exists({_id : filter.dto._id})

            if (exists) {
                await ItemModel.updateOne({_id : filter.dto._id}, {...filter.dto})
            }else {
                await ItemModel.create(filter.dto)
            }
        
            return right(null)
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

    public async find_many(filter : {dto : Partial<IItem>}): RepositoryBaseResult<IItem[]> {
        try {
            const items = await ItemModel.find(filter.dto)
            const itemsObject = []
            
            for (const item of items) {
                itemsObject.push(item.toObject())
            }

            return right(itemsObject)

        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }
}