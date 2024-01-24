const jwt = require("jsonwebtoken")
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../shared/core/Result";
import { JWTDTO } from "../../domain/jwt";
import { IAuthService } from "../IAuthService";
    
export class AuthService implements IAuthService {
    private readonly saltedRounds = 10
    protected key: string;

    constructor(key : string) {
        this.key = key
    }

    public async signJWT(props: JWTDTO): Promise<string> {
        return jwt.sign(props, this.key, )
    }

    public async decodeJWT(token : string) : Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, JWTDTO>> {
        
        try {
            const decodedJWT = jwt.verify(token, this.key)

            return right(decodedJWT as JWTDTO)
            
        } catch (error) {
            return left(CommonUseCaseResult.UnexpectedError.create(error))
        }
    }

}   