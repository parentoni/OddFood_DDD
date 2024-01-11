import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { Payment } from "../../domain/payment";

// Possible responses of Create Invoice Use Case
export type CreateInvoiceResponse = Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, { message: string }>
