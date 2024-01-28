export interface JWTDTO {
    uid : string,
    email : string, 
    name : string,
    role : number,
    token_function : TokenFunctions,
}

export enum TokenFunctions {
    authenticateUser = "AUTHENTICATE_USER"
}

export type JWTToken = string