import { Router } from "express"
import { createInvoiceController } from "../../useCases/createInvoice"

const paymentsRouter = Router()

paymentsRouter.post('/create', (req, res) => createInvoiceController.execute(req, res))

export {paymentsRouter}
