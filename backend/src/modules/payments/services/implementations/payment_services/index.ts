import { gerenciaNetPix } from "../pix_apis";
import { PixService } from "./pixService";

const pixService = new PixService([gerenciaNetPix])

export {pixService}

export enum SUPPORTED_PAYMENT_SERVICES {
  PIX = "PIX"
}
