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
        const exists = await UserModel.exists({_id : filter.dto._id})

        if (exists) {
            await UserModel.updateOne({_id : filter.dto._id}, {...filter.dto})
        } else {
            //todo: move hash logic to UserPassword -> UserMap
            const password = await bcrypt.hash(filter.dto.password.toString(), this.saltedRounds)
            filter.dto.password = password
    
                const exists = await this.exists({dto : {email : filter.dto.email}})
    
                if (exists.isLeft()) {
                    return left(exists.value)
                }

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
            
            if (user === null) {
                return left(
                    CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `[1]: A user could not be found with the specified params: ${filter.dto}`,
                    location: `${UserRepo.name}.${this.exists.name}`,
                    variable: "USER_PARAMS"}))
            }

            const userDomain = UserMap.toDomain(user.toObject())
            if (userDomain.isLeft()) {
                return left(userDomain.value)
            }

            //todo: Transform to aggregate before returning 
            return right(userDomain.value)
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

    public async find_one(filter: { dto: Partial<IUser> }) : RepositoryBaseResult<User> {
        try {
            const user = await UserModel.findOne(filter.dto)

            if (!user || user === null) {
                return left(
                    CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `A user could not be found with the specified params: ${filter.dto}`,
                    location: `${UserRepo.name}.${this.exists.name}`,
                    variable: "USER_PARAMS"}))
            }
            
            const userDomain = UserMap.toDomain(user.toObject())
            
            if (userDomain.isLeft()) {
                return left(userDomain.value)
            }
            return right(userDomain.value)


        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }
    

}
