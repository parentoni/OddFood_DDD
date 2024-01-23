export interface PixDTO {
  qrcode:string
}

// See https://bacen.github.io/pix-api/index.html#

export type PixCob = {
  calendario: {
    criacao: string,
    expiracao: number,
  },
  txid: string,
  revisao: number,
  status: PixCobStatus,
  devedor: PixCobDevedor,
  valor: {
    original: string
  },
  chave: string
}

export type PixCobDevedor = PixCobDevedorCNPJ | PixCobDevedorCPF

export type PixCobDevedorCNPJ = {
  cnpj:string,
  name:string,
}

export type PixCobDevedorCPF = {
  cpf:string,
  name:string,
}

export enum PixCobStatus {
  ATIVA = "ATIVA",
  CONCLUIDA = "CONCLUIDA",
  REMOVIDO_PELO_USUARIO_RECEBEDOR = "REMOVIDO_PELO_USUARIO_RECEBEDOR",
  REMOVIDO_PELO_PSP = "REMOVIDO_PELO_PSP",
}
