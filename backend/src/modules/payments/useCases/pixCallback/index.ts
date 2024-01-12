import { PixCallbackUseCase } from "./PixCallbackUseCase";
import { PixCallbackController } from "./PixCallbackController";
import { paymentRepo } from "../../repo";

const pixCallbackUseCase = new PixCallbackUseCase(paymentRepo)
const pixCallbackController = new PixCallbackController(pixCallbackUseCase)

export {pixCallbackUseCase, pixCallbackController}
