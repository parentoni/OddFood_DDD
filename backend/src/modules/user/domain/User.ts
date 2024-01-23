import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { UserEmail } from "./userProps/userEmail";
import { UserGrade } from "./userProps/userGrade";
import { UserName } from "./userProps/userName";
import { UserPassword } from "./userProps/userPassword";
import { UserRole } from "./userProps/userRole";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
import { Either, left, right } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Guard } from "../../../shared/core/Guard";

type UserResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, User>
export interface IUserProps {
    email : UserEmail,
    password : UserPassword,
    name : UserName,
    grade : UserGrade,
    role : UserRole
}

export class User extends AggregateRoot<IUserProps> {
    
    get userId() : UniqueGlobalId {
        return new UniqueGlobalId()
    }

    get name() : UserName {
        return this.name
    }
    get role() : UserRole {
        return this.role
    }

    get grade() : UserGrade {
        return this.grade
    }

    get email() : UserEmail {
        return this.email
    }
    get password() : UserPassword {
        return this.password
    }

    public static create(props : IUserProps) : UserResponse {
        const GuardResponse = Guard.againstNullOrUndefinedBulk([
            {argument : props.name.value, argumentName : "USER_NAME"},
            {argument : props.role.value, argumentName : "USER_ROLE"},
            {argument : props.email.value, argumentName : "USER_EMAIL"},
            {argument : props.password.value, argumentName : "USER_PASSWORD"},
            {argument : props.grade.value, argumentName : "USER_GRADE"}
        ])

        if (GuardResponse.isLeft()) {
            return left(GuardResponse.value)
        }

        return right(new User(props))
    }

}