import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { IUser, IUserNoId } from "../../../shared/infra/database/models/User";
import { User } from "../domain/User";

export class UserMap {

    public static toPersistent(props : User) :  Either<CommonUseCaseResult.UnexpectedError, IUser>{
        
        try {
            const UserObject = {
                _id : props.id.toValue(),
                email : props.props.email.value,
                password : props.props.password.value,
                name : props.props.name.value,
                role : props.props.role.value
            }
            return right(UserObject)
        }catch (error) {
            return left(CommonUseCaseResult.UnexpectedError.create(error))
        }
       
    }

  //todo: Create toDomain
}
