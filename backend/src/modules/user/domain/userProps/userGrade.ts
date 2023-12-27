import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValueObject } from "../../../../shared/domain/ValueObject";
import { USER_GRADE } from "../../../../shared/infra/database/models/User";

type UserGradeResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, UserGrade >

interface IUserRole {
    value : number
}

export class UserGrade extends ValueObject<IUserRole> {
    get value() : USER_GRADE {
        return this.props.value
    }

    public static create(props : IUserRole) : UserGradeResponse {
        const GradeExists =  Object.values(USER_GRADE).includes(props.value)

        if (!GradeExists) {
            return left(CommonUseCaseResult.InvalidValue.create({
                errorMessage: `Grade does not exist.`,
                variable: "USER_GRADE",
                location: `${UserGrade.name}.${UserGrade.create.name}`
            }))
        }
        return right(new UserGrade(props))
    }
}
