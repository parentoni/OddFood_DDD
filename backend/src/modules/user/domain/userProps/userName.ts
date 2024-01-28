import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { IDefaultProp } from "./userEmail";
type IUsernameResponse = Either<CommonUseCaseResult.InvalidValue, UserName>

export class UserName extends ValueObject<IDefaultProp> {

    get value() : string {
        return this.props.value
    }

    public static create(props : IDefaultProp) : IUsernameResponse {
        const GuardResponse = Guard.againstNullOrUndefined(props.value.trim(), "USERNAME")
        const GuardLengthResponse = Guard.againstAtMost(24, props.value.trim())

        if (GuardResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardResponse.value.error.errorMessage}`,
                variable: "USERNAME",
                location: `${UserName.name}.${UserName.create.name}`
            }))
        }
        if (GuardLengthResponse.isLeft()) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `${GuardLengthResponse.value.error.errorMessage}`,
                variable: "USERNAME",
                location: `${UserName.name}.${UserName.create.name}`
            }))
        }


        return right (new UserName(props))
    }
}