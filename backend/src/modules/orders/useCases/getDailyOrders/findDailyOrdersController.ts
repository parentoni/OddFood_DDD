import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request, Response } from "express";
import { FindDailyOrdersUseCase } from "./findDailyOrdersUseCase";

export class FindDailyOrdersController extends BaseController<Request> {
    constructor(FindDailyOrdersUseCase : FindDailyOrdersUseCase) {
        super()

        this.versionRegister.default = "1.0.0"

        this.versionRegister.addToRegister("1.0.0", async (req : Request, res : Response) => {
            try {

            const result = await FindDailyOrdersUseCase.execute()

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

