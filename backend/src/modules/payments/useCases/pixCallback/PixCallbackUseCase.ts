import { Guard } from "../../../../shared/core/Guard";
import { Left, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IPaymentRepo } from "../../repo/IPaymentRepo";
import { pixService } from "../../services/implementations/payment_services";
import { PixCallbackDTO } from "./PixCallbackDTO";
import { PixCallbackResponse } from "./PixCallbackResponse";

/**
 *@description Use case that handles pix Payment gateways/APIs callbacks.
 *@author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 * */
export class PixCallbackUseCase implements UseCase<PixCallbackDTO, PixCallbackResponse> {
  paymentsRepo: IPaymentRepo;

  /**
   * @description Return a new Pix Callback Use Case
   * @props paymentsRepo - Payment Repository
   * */
  constructor(paymentsRepo: IPaymentRepo) {
    this.paymentsRepo = paymentsRepo
  }

  async execute(request: PixCallbackDTO): Promise<PixCallbackResponse> {

    //Check if request.pix exists, in other words, if request was sent
    const guardResponse = Guard.againstNullOrUndefined(request.pix, "PIX")
    if (guardResponse.isLeft()) {
      return left(guardResponse.value)
    }

    //Check if payment with external id exists
    const repoResponse = await this.paymentsRepo.findOneByExternalId(request.pix.txid)
    if (repoResponse.isLeft()) {
      return left(repoResponse.value)
    }

    //If Payment exists, run service
    const serviceResponse = await pixService.callbackInterpreter({payment: repoResponse.value, paymentDTO: request.pix})
    if (serviceResponse.isLeft()) {
      return left(serviceResponse.value)
    }

    //If everything went well, save aggregate
    const save = await this.paymentsRepo.save(repoResponse.value)
    if (save.isLeft()) {
      return left(save.value)
    }

    return right(null)
  }

}
