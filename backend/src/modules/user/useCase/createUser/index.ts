import { UserRepo } from "../../repository/userRepo";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { authService } from "../../services";
import { models } from "mongoose";

const createUserUseCase = new CreateUserUseCase(new UserRepo());
const createUserController = new CreateUserController(createUserUseCase, authService);
export { createUserUseCase, createUserController };