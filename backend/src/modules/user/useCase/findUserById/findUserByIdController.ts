import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { FindUserByIdUseCase } from "./findUserByIdUseCase";

export class FindUserByIdController extends BaseController<Request> {
    constructor(FindUserByIdUseCase : FindUserByIdUseCase) {
        super()

        this.versionRegister.default = "1.0.0"

        this.versionRegister.addToRegister("1.0.0", async (req : Request, res : Response) => {
            try {
            
            const props = req.params

            const response = await FindUserByIdUseCase.execute(props.id as string)

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
