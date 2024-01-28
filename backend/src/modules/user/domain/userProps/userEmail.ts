
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { models } from "mongoose";
import { UserRepo } from "../../repository/userRepo";
export interface IDefaultProp {
    value : string
}

type UserEmailResponse = Either<CommonUseCaseResult.InvalidValue, UserEmail>

export class UserEmail extends ValueObject<IDefaultProp> {
    get value() : string {
        return this.props.value
    }

    public static create( props : IDefaultProp) : UserEmailResponse {
        const ValidEmail = props.value.trim().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

        if (!ValidEmail) {
            return left(
                CommonUseCaseResult.InvalidValue.create({
                    errorMessage: `The value sent is not a valid email: ${props.value}`,
                    variable: "USER_EMAIL",
                    location: `${UserEmail.name}.${UserEmail.create.name}`
                })
            )
        }

        return right(new UserEmail(props))

        // TODO: check if theres already an account with the specified email

    }
}