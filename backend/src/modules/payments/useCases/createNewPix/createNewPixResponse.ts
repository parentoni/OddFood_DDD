import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { PixDTO } from "../../dtos/PixDTO";


export type CreateNewPixResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, PixDTO>