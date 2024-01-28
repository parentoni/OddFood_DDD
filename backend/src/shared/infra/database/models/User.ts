import mongoose from "mongoose";

export enum USER_GRADE {
    firstGrade = 1,
    secondGrade = 2
}

export enum USER_ROLE {
    user = 0,
    dev = 1
}

const UserSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    // grade : {type : USER_GRADE},
    role : {type : USER_ROLE},
    password : {type : String},
})

export interface IUserNoId {
    name : string,
    email : string,
    // grade : USER_GRADE,
    role : USER_ROLE,
    password : string
}
export interface IUser {
    _id : string,
    name : string,
    email : string,
    // grade : USER_GRADE,
    role : USER_ROLE,
    password : string
}

const UserModel = mongoose.model('user', UserSchema)
export { UserModel }
