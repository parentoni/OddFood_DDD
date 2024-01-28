import { Either } from "../../../shared/core/Result";
import { IItem, IItemNoId } from "../../../shared/infra/database/models/Item";
import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
export interface IItemRepo {
    save(filter : {dto : IItem}) : RepositoryBaseResult<null>,
    find_many(filter : {dto : Partial<IItem>}) : RepositoryBaseResult<IItem[]>
}