import { Either } from "../../../shared/core/Result";
import { IItem, IItemNoId } from "../../../shared/infra/database/models/Item";
import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
export interface IItemRepo {
    save(filter : {dto : IItem}) : RepositoryBaseResult<IItem>
}