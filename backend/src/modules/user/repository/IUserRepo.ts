
import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
import User from "../../../shared/infra/database/models/User";
import { IUser } from "../../../shared/infra/database/models/User";
import { IUserNoId } from "../../../shared/infra/database/models/User";
export interface IUserRepo {
    save : (filter : {dto : IUser}) => RepositoryBaseResult<IUser>;
    exists : (filter : {dto : Partial<IUser>}) => RepositoryBaseResult<true | false>;
    find_one : (filter : {dto : Partial<IUser>}) => RepositoryBaseResult<IUser>;
}