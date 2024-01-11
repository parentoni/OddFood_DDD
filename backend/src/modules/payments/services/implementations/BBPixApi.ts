import { Secrets } from "../../../../config/secretsManager";
import { IPixApi, PixApiCreateChargeDTO, PixApiCreateChargeResponse } from "../IPixAPI";

export class BBPixApi implements IPixApi {

  private BB_PIX_API_URL:string
  private BB_PIX_API_SECRET:string
  private BB_PIX_API_ID:string
  private BB_PIX_API_APP_KEY:string

  constructor() {
    this.BB_PIX_API_URL = Secrets.getSecret('BB_PIX_API_URL')
    this.BB_PIX_API_SECRET = Secrets.getSecret('BB_PIX_API_SECRET')
    this.BB_PIX_API_ID = Secrets.getSecret('BB_PIX_API_ID')
    this.BB_PIX_API_APP_KEY = Secrets.getSecret('BB_PIX_API_APP_KEY')
  }


  createCharge(props: PixApiCreateChargeDTO): PixApiCreateChargeResponse {
    
  }

}
