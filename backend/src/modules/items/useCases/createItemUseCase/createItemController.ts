import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request, Response } from "express";

import { IUser } from "../../../../shared/infra/database/models/User";

import { CreateItemUseCase } from "./createItemUseCase";
export class CreateItemController extends BaseController<Request> {
    constructor(CreateItemUseCase : CreateItemUseCase) {
        super()

        this.versionRegister.default = "1.0.0"

        this.versionRegister.addToRegister("1.0.0", async (req : Request, res : Response) => {
            try {

            
            const dto = req.body

            const result = await CreateItemUseCase.execute(dto)

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

