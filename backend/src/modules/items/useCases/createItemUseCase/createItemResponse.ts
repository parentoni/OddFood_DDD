import { BaseError } from "../../../../shared/core/Response/Error"
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError"
import { Either } from "../../../../shared/core/Result"
import { IBaseError } from "../../../../shared/core/Response/Error"
import { GenericError } from "../../../../shared/core/Response/Error"
import { IItem } from "../../../../shared/infra/database/models/Item"
export type CreateItemResponse =  Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError | GenericError<IBaseError>, IItem>>