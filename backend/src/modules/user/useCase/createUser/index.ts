import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { authService } from "../../services";
import { userRepo } from "../../repository";

const createUserUseCase = new CreateUserUseCase(userRepo);
const createUserController = new CreateUserController(createUserUseCase, authService);
export { createUserUseCase, createUserController };
