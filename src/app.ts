import express from "express";
import "express-async-errors";
import appErrorMiddleware from "./middlewares/appError.middleware";
import userRouter from "./routes/users.routes";

const app = express()

app.use(express.json())

app.use("/users", userRouter)

app.use(appErrorMiddleware)

export default app