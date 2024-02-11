import { Secrets } from "../../../../../config/secretsManager";
import { CertificatedApi } from "../../../../../shared/core/certificatedApi";
import { GerenciaNet } from "./gerenciaNet"; 

//Get certificate
const gerenciaNetCertificatedApi = new CertificatedApi(`/../../../static/certs/${Secrets.getSecret("GERENCIANET_PIX_CERTIFICATE_NAME")}`)
const gerenciaNetPix = new GerenciaNet(gerenciaNetCertificatedApi)

export { gerenciaNetPix }
