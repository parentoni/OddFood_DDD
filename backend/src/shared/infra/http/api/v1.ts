import express from "express";
import { itemRouter } from "../../../../modules/items/domain/routes/item";
import { paymentsRouter } from "../../../../modules/payments/infra/routes/Payments";
import { authRouter } from "../../../../modules/user/domain/routes/auth";
import { userRouter } from "../../../../modules/user/domain/routes/user";


const v1Router = express.Router();

v1Router.use('/payments', paymentsRouter)
v1Router.use('/auth', authRouter)
v1Router.use('/item', itemRouter)
v1Router.use("/user", userRouter)
export { v1Router };
