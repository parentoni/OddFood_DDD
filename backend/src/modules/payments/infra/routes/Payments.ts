import { Router } from "express"
import { createInvoiceController } from "../../useCases/createInvoice"
import { pixCallbackController } from "../../useCases/pixCallback"

const paymentsRouter = Router()

paymentsRouter.post('/create', (req, res) => createInvoiceController.execute(req, res))

// Webhooks callbacks
paymentsRouter.post('/webhook/pix', (req, res) => pixCallbackController.execute(req, res))

export {paymentsRouter}
