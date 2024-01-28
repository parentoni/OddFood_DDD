import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../shared/core/Result";
import { IUser, IUserNoId } from "../../../shared/infra/database/models/User";
import { User } from "../domain/User";
import { UserEmail } from "../domain/userProps/userEmail";
import { UserPassword } from "../domain/userProps/userPassword";
import { UserRole } from "../domain/userProps/userRole";
import { UserName } from "../domain/userProps/userName";
import { UniqueGlobalId } from "../../../shared/domain/UniqueGlobalD";
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
        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
       
    }

    public static toDomain(props : IUser) :  Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, User> {
        try {
        const EmailOrError =  UserEmail.create({value : props.email.trim()})
        const PasswordOrError = UserPassword.create({value : props.password.trim()})
        const RoleOrError = UserRole.create({value : props.role})
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

        const UserOrError = User.create({
            email : EmailOrError.value,
            password : PasswordOrError.value,
            role : RoleOrError.value,
            name : UsernameOrError.value,
        
        }, new UniqueGlobalId(props._id))
        
        if (UserOrError.isLeft()) {
            return left(UserOrError.value)
        }
        
        return right(UserOrError.value)


        }catch (err) {
            return left(CommonUseCaseResult.UnexpectedError.create(err))
        }
    }

  //todo: Create toDomain
}
