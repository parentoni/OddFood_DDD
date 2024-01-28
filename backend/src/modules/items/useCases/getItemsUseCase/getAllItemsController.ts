import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { GetAllItemsUseCase } from "./getAllItemsUseCase";

export class GetAllItemsController extends BaseController<Request> {
    constructor(GetAllItemsUseCase : GetAllItemsUseCase) {
        super()

        this.versionRegister.default = "1.0.0"

        this.versionRegister.addToRegister("1.0.0", async (req : Request, res : Response) => {
            try {
            

            const response = await GetAllItemsUseCase.execute()

            if (response.isLeft()) {
                return this.errorHandler(res, response)
            }

            return this.ok(res, response.value)
        }catch(error){
            return this.fail(res, error as Error)
        }
        })
    }
}
