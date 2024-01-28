import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { IDefaultProp } from "./userEmail";
// const bcrypt = require("bcrypt")
type UserPasswordResponse = Either<CommonUseCaseResult.InvalidValue, UserPassword>

export class UserPassword extends ValueObject<IDefaultProp> {

    get value() : string {
        return this.props.value
    }

    public static create(props : IDefaultProp) : UserPasswordResponse {
        const GuardResponse = Guard.againstNullOrUndefined(props.value, "USER_PASSWORD")

        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "USER_PASSWORD",
                location: `${UserPassword.name}.${UserPassword.create.name}`
            }))
        }

        return right(new UserPassword(props))
    }
}
