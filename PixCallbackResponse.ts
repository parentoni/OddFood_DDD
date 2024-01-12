import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";

// Return right null if success
export type PixCallbackResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, null>
