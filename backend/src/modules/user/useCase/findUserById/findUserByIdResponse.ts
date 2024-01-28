import { BaseError, GenericError, IBaseError } from "../../../../shared/core/Response/Error";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { IUser } from "../../../../shared/infra/database/models/User";
import { User } from "../../domain/User";

export type FindUserByIdResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError | GenericError<IBaseError> | BaseError<IBaseError>, IUser>