import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request, Response } from "express";
import { CreateOrderUseCase } from "./createOrderUseCase";
import { IOrder, IOrderWithoutId } from "../../../../shared/infra/database/models/Order";

export class CreateOrderController extends BaseController<Request> {
    constructor(CreateOrderUseCase : CreateOrderUseCase) {
        super()

        this.versionRegister.default = "1.0.0"

        this.versionRegister.addToRegister("1.0.0", async (req : Request, res : Response) => {
            try {

            const dto = req.body as IOrderWithoutId

            const result = await CreateOrderUseCase.execute(dto)

            if (result.isLeft()) {
                return this.errorHandler(res, result)
            }

            return this.ok(res)
        }catch  (err) {
            return this.fail(res, err as Error)
        }
        })
    }
}

