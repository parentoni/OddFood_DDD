import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
import { IOrder } from "../../../shared/infra/database/models/Order";
import { IOrderWithDate } from "../../../shared/infra/database/models/Order";
export interface IOrderRepository {
    save(filter : {dto : IOrderWithDate}) : RepositoryBaseResult<null>,
    find_one(filter : {dto : string}) : RepositoryBaseResult<IOrder>,
    exists(filter : {dto : string}) : RepositoryBaseResult<boolean>,
    findByDate(filter : {date : Date}) : RepositoryBaseResult<IOrder[]>
}