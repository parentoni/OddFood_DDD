// import { IAuthService } from "../../../../modules/user/services/IauthService";
// import express from "express";
// import { Guard } from "../../../core/Guard";
// import { AuthenticatedRequest } from "../models/AutheticatedRequest";
// export class Middleware {
//   private authService: IAuthService;

//   constructor(authService: IAuthService) {
//     this.authService = authService;
//   }

//   public authenticated() {
//     return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//       const token = req.headers["authorization"]?.split(" ")[1];

//       const result = Guard.againstNullOrUndefined(token, "Authorization token");

//       if (result.isRight() && token) {
//         const decoded = await this.authService.decodeJWT(token);

//         if (decoded.isRight()) {
//           if (decoded.value.verified === true) {
//             (req as AuthenticatedRequest).decoded = decoded.value;
//             next();
//           } else {
//             return res.status(401).send("Unverified account");
//           }
//         } else {
//           return res.status(401).send(decoded.value.error);
//         }
//       } else {
//         return res.status(401).send(result.value);
//       }
//     };
//   }
// }

import { NextFunction, Request, Response } from "express"
import { Secrets } from "../../../../config/secretsManager"
import { Guard } from "../../../core/Guard"
import { AuthService } from "../../../../modules/user/services/implementations/authService"
export class Middleware {
    
    public static authenticate() {
        return (async (req : Request, res : Response, next : NextFunction) => {

            const token = req.headers.authorization?.split(' ')[1]

            const GuardResponse = Guard.againstNullOrUndefined(token, "TOKEN")

            if (GuardResponse.isLeft() || !token) {
                return res.status(401).send(GuardResponse)
            }

            const decoded = await new AuthService(Secrets.getSecret("PRIVATE_KEY")).decodeJWT(token)

            if (decoded.isRight()) {
                console.log('hello', decoded.value)
                if (decoded.value.role !== 1) {
                    return res.status(401).send("Unauthorized account")
                }
                return next()
            }else {
                return res.status(401).send(decoded.value)
            }


        })
    }
}
