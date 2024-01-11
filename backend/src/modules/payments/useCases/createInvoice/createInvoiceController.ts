import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateInvoiceUseCase } from "./CreateInvoiceUseCase";
import { CreateInvoiceDTO } from "./createInvoiceDTO";
import { Request } from "express";
/**
 * @description Create Invoice Use case HTTP controller
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 * */
export class CreateInvoiceController extends BaseController<Request> {
  // pass use case as param
  constructor(useCase: CreateInvoiceUseCase) {
    super()

    //REgister v1
    this.versionRegister.addToRegister('1.0.0', async (req, res) => {
      const dto  = req.body as CreateInvoiceDTO

      const response = await useCase.execute(dto)
      if (response.isLeft()) {
        return this.errorHandler(res, response)
      } 

      return this.ok(res, response.value)
    })
  }
}
