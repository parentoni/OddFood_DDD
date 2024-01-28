import mongoose, { Model } from "mongoose";
import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
import { IItemRepo } from "./IItemRepo";
import { IItem, IItemNoId } from "../../../shared/infra/database/models/Item";
import { left, right } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";

export class ItemRepo implements IItemRepo {
    private readonly itemModel


    constructor(models : mongoose.Models) {
        this.itemModel = models.item
    }

    public async save(filter : {dto : IItem}) : RepositoryBaseResult<null> {
        try {
            const exists = await this.itemModel.exists({_id : filter.dto._id})

            if (exists) {
                await this.itemModel.updateOne({_id : filter.dto._id}, {...filter.dto})
            }else {
                await this.itemModel.create(filter.dto)
            }
        
            return right(null)
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

    public async find_many(filter : {dto : Partial<IItem>}): RepositoryBaseResult<IItem[]> {
        try {
            const items = await this.itemModel.find(filter.dto)

            return right(items)

        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }
}