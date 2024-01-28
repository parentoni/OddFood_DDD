
import { IUser, IUserNoId } from "../../../../shared/infra/database/models/User";
import { UseCase } from "../../../../shared/core/UseCase";
import { CreateUserResponse } from "./CreateUserResponse";
import { UserEmail } from "../../domain/userProps/userEmail";
import { UserPassword } from "../../domain/userProps/userPassword";
import { UserRole } from "../../domain/userProps/userRole";
import { UserMap } from "../../mappers/userMap";
import mongoose from "mongoose";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { UserName } from "../../domain/userProps/userName";
import { User } from "../../domain/User";
import { UserRepo } from "../../repository/userRepo";
import { IUserRepo } from "../../repository/IUserRepo";
import { left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { UserGrade } from "../../domain/userProps/userGrade";

// TODO check if user is dev to create another dev

export class CreateUserUseCase implements UseCase<IUserNoId,CreateUserResponse> {
    private userRepo : IUserRepo

    constructor(props : IUserRepo) {
        this.userRepo = props
    }

    async execute(props : IUserNoId) : CreateUserResponse {
        const EmailOrError = UserEmail.create({value : props.email.trim()})
        const PasswordOrError = UserPassword.create({value : props.password.trim()})
        const RoleOrError = UserRole.create({value : 0})
        const UsernameOrError = UserName.create({value : props.name.trim()})

        // const response = EitherUtils.combine([EmailOrError, PasswordOrError, RoleOrError, UsernameOrError])

        if (EmailOrError.isLeft()) {
            return left(EmailOrError.value)
        }
        if (PasswordOrError.isLeft()) {
            return left(PasswordOrError.value)
        }
        if (RoleOrError.isLeft()) {
            return left(RoleOrError.value)
        }
        if (UsernameOrError.isLeft()) {
            return left(UsernameOrError.value)
        }

        // if (response.isLeft()) {
        //     return left(response.value)
        // }

        const UserOrError = User.create({
            email : EmailOrError.value,
            password : PasswordOrError.value,
            role : RoleOrError.value,
            name : UsernameOrError.value,
        })

        if (UserOrError.isLeft()) {
            return left(UserOrError.value)
        }
        try {
            const objectUser = UserMap.toPersistent(UserOrError.value)
            if (objectUser.isLeft()) {
                return left(objectUser.value)
            }
            const NewUser = await this.userRepo.save({dto : objectUser.value})

            if (NewUser.isLeft()) {
                return left(NewUser.value)
            }

            const userPersistent = UserMap.toPersistent(NewUser.value)

            if (userPersistent.isLeft()){
                return left(userPersistent.value)
            }

            return right(userPersistent.value)
            
        }catch (error) {
            return left(CommonUseCaseResult.UnexpectedError.create(error))
        }

    }   
}
