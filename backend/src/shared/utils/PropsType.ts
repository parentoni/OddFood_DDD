import { Either } from "../core/Result";
import { CommonUseCaseResult } from "../core/Response/UseCaseError";

export type PropsResponse<U> = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, U>