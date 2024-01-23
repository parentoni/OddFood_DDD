import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";

// Create invoice aggregate of common errors
export class CreateInvoiceErrors {
  public static UserNotFound(id:string) {
    return CommonUseCaseResult.InvalidValue.create({
      location: `CreateInvoiceUseCase.execute`,
      errorMessage: `The id ${id} was not found.`,
      variable: "ID",
      printableErrorMessage: `O usuário não foi encontrado`
    })
  }

  public static ServiceNotFound(service:string) {
    return CommonUseCaseResult.InvalidValue.create({
      location: 'CreateInvoiceUseCase.execute',
      errorMessage: `The service ${service} was not found.`,
      variable: "SERVICE",
      printableErrorMessage: `O metodo de pagamento ${service} is not valid`
    })
  }
}
