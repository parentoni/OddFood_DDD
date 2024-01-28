import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { TokenFunctions } from "../../domain/jwt";
import { IAuthService } from "../../services/IAuthService";
import { IUser } from "../../../../shared/infra/database/models/User";
import { AuthService } from "../../services/implementations/authService";
import { UserRepo } from "../../repository/userRepo";
export class CreateUserController extends BaseController<Request> {
    constructor(CreateUserUseCase : CreateUserUseCase, authService : IAuthService) {
        super()

        this.versionRegister.default = "1.0.0"

        this.versionRegister.addToRegister("1.0.0", async (req : Request, res : Response) => {
            try {

            
            const dto = req.body as IUser

            const result = await CreateUserUseCase.execute(dto)

            if (result.isLeft()) {
                return this.errorHandler(res, result)
            }

            const token = await authService.signJWT({
                uid: result.value._id as string,
                email: dto.email,
                name: dto.name,
                token_function: TokenFunctions.authenticateUser,
                role: 0,
            })

            return this.ok(res, {token : token})
        }catch  (err) {
            return this.fail(res, err as Error)
        }
        })
    }
}

