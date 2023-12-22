import { Router } from "express"
import { testCreateNewPixController } from "../../useCases/testCreateNewPix"

const paymentsRouter = Router()

paymentsRouter.get('/test/create', (req, res) => testCreateNewPixController.execute(req, res))

export {paymentsRouter}