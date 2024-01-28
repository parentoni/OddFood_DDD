import { IUserRepo } from "./IUserRepo";
import { UserModel } from "../../../shared/infra/database/models/User";
import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
import { IUser } from "../../../shared/infra/database/models/User";
import { left, right } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { User } from "../domain/User";
import { UserMap } from "../mappers/userMap";
const bcrypt = require("bcrypt")

export class UserRepo implements IUserRepo {

    private readonly saltedRounds = 10

    public async save(filter : {dto : IUser}) : RepositoryBaseResult<User> { 
        try {
        const exists = await UserModel.exists(filter.dto._id)

        if (exists) {
            await UserModel.updateOne({_id : filter.dto._id}, {...filter.dto})
        } else {
            //todo: move hash logic to UserPassword -> UserMap
            const password = await bcrypt.hash(this.saltedRounds, filter.dto.password)
            filter.dto.password = password
    
            
    
                const NewUser = await UserModel.create(filter.dto)
    
                if (!NewUser) {
                    return left(CommonUseCaseResult.UnexpectedError.create({
                        errorMessage: `Unexpected error while creating user: ${filter.dto}`,
                        location: `${UserRepo.name}.${this.save.name}`,
                        variable: "USER_REPO_CREATE_USER"
                    }))
                }
            }
            const user = await UserModel.findOne({_id : filter.dto._id})

            //todo: Transform to aggregate before returning 
            return right(user.toObject())
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

// returns right when doesnt exist

    public async exists(filter : {dto : Partial<IUser>}) : RepositoryBaseResult<true | false> {

        try {
            const user = await UserModel.findOne(filter.dto)
            
            if (!user) {
                return right(false)
            }
            return left(CommonUseCaseResult.InvalidValue.create({
            errorMessage: `An user was already found using these params: ${filter.dto}`,
            location: `${UserRepo.name}.${this.exists.name}`,
            variable: "USER_PARAMS"}))

        }catch (error) {
            return left(CommonUseCaseResult.UnexpectedError.create(error))
        }
    }

    public async find_one(filter: { dto: Partial<IUser> }) : RepositoryBaseResult<IUser> {
        try {
            const user = await UserModel.findOne(filter.dto)

            if (!user) {
                return left(
                    CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `A user could not be found with the specified params: ${filter.dto}`,
                    location: `${UserRepo.name}.${this.exists.name}`,
                    variable: "USER_PARAMS"}))
            }

            return right(user)


        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }
    

}
