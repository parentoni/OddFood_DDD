import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../shared/core/Result";
import { IOrder, OrderModel } from "../../../shared/infra/database/models/Order";
import { IOrderRepository } from "./IOrderRepository";
import { IOrderItem } from "../../../shared/infra/database/models/Order";
import { IOrderWithDate } from "../../../shared/infra/database/models/Order";
import mongoose from "mongoose";
export class OrderRepo implements IOrderRepository {
    public async save(filter : {dto : IOrderWithDate}) : RepositoryBaseResult<null> {
        try {

            const exists = await this.exists({dto : filter.dto._id})

            if (exists.isLeft()) {

                await OrderModel.updateOne({_id : filter.dto._id}, {...filter.dto})
            } else {
                console.log(filter.dto._id, "LEGAL")
                await OrderModel.create(filter.dto)
            }

            return right(null)

        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

    public async find_one(filter : {dto : string}) : RepositoryBaseResult<IOrder> {
        try {

            const order = await OrderModel.findOne({_id : filter.dto})

            if (!order || order === null) {
                return left(CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `An order could not be found with the specified params: ${filter.dto}`,
                    location: `${OrderRepo.name}.${this.find_one.name}`,
                    variable: "USER_PARAMS"}))
            }
           

            return right({_id : order._id.toString(),
            items : order.items,
            date : order.date.toString(),
            paid : order.paid,
            username : order.username
            })
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }
    // returns right when doesnt exist

    public async exists(filter : {dto : string}) : RepositoryBaseResult<boolean> {
        try {

            const user = await OrderModel.findById(filter.dto)
            if (!user) {
                return right(false)
            }
            return left(CommonUseCaseResult.InvalidValue.create({
            errorMessage: `An order was already found using these params: ${filter.dto}`,
            location: `${OrderRepo.name}.${this.exists.name}`,
            variable: "USER_PARAMS"}))

        }catch (error) {
            return left(CommonUseCaseResult.UnexpectedError.create(error))
        }
    }
}