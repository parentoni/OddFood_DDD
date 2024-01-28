import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { IDefaultProp } from "./userEmail";
import { USER_ROLE } from "../../../../shared/infra/database/models/User";


interface IUserRole {
    value : number
}

type IUserRoleResponse = Either<CommonUseCaseResult.InvalidValue, UserRole>

export class UserRole extends ValueObject<IUserRole> {
    get value() : number {
        return this.props.value
    }

    public static create(props : IUserRole) : IUserRoleResponse {
        const Response = Object.values(USER_ROLE).includes(props.value)

        if (!Response) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `Invalid user role: ${props.value}`,
                variable: "USER_ROLE",
                location: `${UserRole.name}.${UserRole.create.name}`
            }))
        }
        return right(new UserRole(props))
    }
}

