import { JWTDTO, JWTToken } from "../domain/jwt"

export type IAuthService = {
    signJWT (props : JWTDTO) : Promise<string>
}