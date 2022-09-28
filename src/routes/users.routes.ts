import Router from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listOneUserController from "../controllers/users/listOneUser.controller";
import listUserController from "../controllers/users/listUsers.controller";
import updateUserController from "../controllers/users/updateUser.controller";

const userRouter = Router()

userRouter.get("", listUserController)
userRouter.post("", createUserController)
userRouter.patch("/:id", updateUserController)
userRouter.delete("/:id", deleteUserController)
userRouter.get("/:id", listOneUserController)


export default userRouter