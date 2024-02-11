import { Request } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { PixCallbackUseCase } from "./PixCallbackUseCase";
import { PixCallbackDTO } from "./PixCallbackDTO";
import { left } from "../../../../shared/core/Result";
import { PixCob } from "../../dtos/PixDTO";

/**
 * @description Pix Callback http controller
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 * */
export class PixCallbackController extends BaseController<Request>{
  constructor(useCase: PixCallbackUseCase){
    super()

    // Register v1 controller
    this.versionRegister.addToRegister('1.0.0', async (req, res) => {

      const dto = req.body as PixCob[]
      
      const response = await useCase.execute({pix: dto})

      if (response.isLeft()) {
        return this.errorHandler(res, response)
      }

      return this.ok(res)
    })
  }
}
