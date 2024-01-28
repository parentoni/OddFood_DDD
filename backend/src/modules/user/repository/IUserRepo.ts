import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
import { IUser } from "../../../shared/infra/database/models/User";
import { User } from "../domain/User";

export interface IUserRepo {
    save : (filter : {dto : IUser}) => RepositoryBaseResult<IUser>;
    exists : (filter : {dto : Partial<IUser>}) => RepositoryBaseResult<true | false>;
    find_one : (filter : {dto : Partial<IUser>}) => RepositoryBaseResult<User>;
}
