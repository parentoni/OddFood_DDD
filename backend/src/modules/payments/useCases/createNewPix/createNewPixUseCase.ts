import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { FindUserByIdUseCase } from "../../../user/useCase/findUserById/findUserByIdUseCase";
import { PaymentExternalId } from "../../domain/paymentExternalId";
import { CreateNewPixDTO } from "./createNewPixDTO";
import { CreateNewPixErrors } from "./createNewPixErrors";
import { CreateNewPixResponse } from "./createNewPixResponse";

export class CreateNewPixUseCase implements UseCase<CreateNewPixDTO, CreateNewPixResponse> {
  findUserByIdUseCase: FindUserByIdUseCase;

  constructor (findUserByIdUseCase: FindUserByIdUseCase) {
    this.findUserByIdUseCase = findUserByIdUseCase
  }

  async execute(request: CreateNewPixDTO): Promise<CreateNewPixResponse> {

    const txid = PaymentExternalId.create({txid: request.externalId})
    if (txid.isLeft()) {
      return left(txid.value)
    }

    const user = await this.findUserByIdUseCase.execute({id: request.user})

    if (user.isLeft()) {
      return left(CreateNewPixErrors.UserNotFound(request.user))
    }

    return right({qrcode: ''})

  }
}