import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { CreateNewPixUseCase } from "./createNewPixUseCase";

export class CreateNewPixErrors {
  public static UserNotFound(id:string) {
    return CommonUseCaseResult.InvalidValue.create({
      location: `${CreateNewPixUseCase.name}.execute`,
      errorMessage: `The id ${id} was not found.`,
      variable: "ID",
      printableErrorMessage: `O usuário não foi encontrado`
    })
  }
}