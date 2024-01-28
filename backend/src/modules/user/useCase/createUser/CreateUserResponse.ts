import { GenericError, IBaseError } from "../../../../shared/core/Response/Error";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { IUser } from "../../../../shared/infra/database/models/User";

export type CreateUserResponse = Promise<Either<CommonUseCaseResult.InvalidValue| CommonUseCaseResult.UnexpectedError| GenericError<IBaseError>, IUser>>