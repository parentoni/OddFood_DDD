import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../shared/core/Result";
import { IOrder, OrderModel } from "../../../shared/infra/database/models/Order";
import { IOrderRepository } from "./IOrderRepository";
import { IOrderItem } from "../../../shared/infra/database/models/Order";

export class OrderRepo implements IOrderRepository {
    public async save(filter : {dto : IOrder}) : RepositoryBaseResult<null> {
        try {

            const exists = await OrderModel.exists({_id : filter.dto._id})

            if (exists) {

                await OrderModel.updateOne({_id : filter.dto._id}, {...filter.dto})
            } else {
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
            payment : order.payment,
            date : order.date.toString(),
            paid : order.paid,
            username : order.username
            })
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }
}