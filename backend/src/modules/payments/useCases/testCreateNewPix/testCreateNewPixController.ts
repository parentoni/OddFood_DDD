import { Request } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateNewPixUseCase } from "../createNewPix/createNewPixUseCase";

//todo: change this to authenticated request
export class TestCreateNewPixController extends BaseController<Request> {
  constructor(useCase:CreateNewPixUseCase) {
    super()
    this.versionRegister.addToRegister('1.0.0', async (req, res) => {
      const response = await useCase.execute({amount: 10, user: '658238ab3a4dea3d63b8491c', externalId: 'ed9579c351ad73cbf372bc1121d814e1'})
      
      if(response.isLeft()) {
        this.errorHandler(res, response)
      } else {
        this.ok(res, response)
      }
    })
  }
}