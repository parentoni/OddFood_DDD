import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { User } from "../../domain/User";

export type FindUserByIdResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, User>