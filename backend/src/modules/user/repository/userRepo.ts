import { IUserNoId } from "../../../shared/infra/database/models/User";
import { IUserRepo } from "./IUserRepo";
import { RepositoryBaseResult } from "../../../shared/core/IBaseRepository";
import { IUser } from "../../../shared/infra/database/models/User";
import mongoose from "mongoose";
import { left, right } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
const bcrypt = require("bcrypt")
export class UserRepo implements IUserRepo {
    
    private readonly userModel

    private readonly saltedRounds = 10

    constructor(models : mongoose.Models) {
        this.userModel = models.user

    }

    public async create(filter : {dto : IUserNoId}) : RepositoryBaseResult<IUser> {       
        const password = await bcrypt.hash(this.saltedRounds, filter.dto.password)
        filter.dto.password = password

        try {

            const NewUser = await this.userModel.create(filter.dto)

            if (!NewUser) {
                return left(CommonUseCaseResult.UnexpectedError.create({
                    errorMessage: `Unexpected error while creating user: ${filter.dto}`,
                    location: `${UserRepo.name}.${this.create.name}`,
                    variable: "USER_REPO_CREATE_USER"
                }))
            }

            return right(
                NewUser
            )
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

// returns right when doesnt exist

    public async exists(filter : {dto : Partial<IUser>}) : RepositoryBaseResult<true | false> {

        try {
            const user = await this.userModel.findOne(filter.dto)
            
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
    

}