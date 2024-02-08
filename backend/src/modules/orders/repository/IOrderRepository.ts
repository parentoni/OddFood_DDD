import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
import { IOrder } from "../../../shared/infra/database/models/Order";

export interface IOrderRepository {
    save(filter : {dto : IOrder}) : RepositoryBaseResult<null>,
    find_one(filter : {dto : string}) : RepositoryBaseResult<IOrder>
}