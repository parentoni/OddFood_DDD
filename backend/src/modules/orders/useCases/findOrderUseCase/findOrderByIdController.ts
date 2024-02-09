import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request, Response } from "express";
import { FindOrderByIdUseCase } from "./findOrderByIdUseCase";
import { IOrder, IOrderWithoutId } from "../../../../shared/infra/database/models/Order";

export class FindOrderByIdController extends BaseController<Request> {
    constructor(FindOrderByIdUseCase : FindOrderByIdUseCase) {
        super()

        this.versionRegister.default = "1.0.0"

        this.versionRegister.addToRegister("1.0.0", async (req : Request, res : Response) => {
            try {

            const dto = req.params.id

            const result = await FindOrderByIdUseCase.execute(dto)

            if (result.isLeft()) {
                return this.errorHandler(res, result)
            }
      
            return this.ok(res, result.value)
        }catch  (err) {
            return this.fail(res, err as Error)
        }
        })
    }
}

