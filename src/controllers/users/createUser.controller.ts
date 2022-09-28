import { Request, Response } from "express"
import { IUserRequest } from "../../interfaces/users"
import createUserService from "../../services/users/createUser.service"

const createUserController = async (req: Request, res: Response) => {

    const {email, name, password, phones}: IUserRequest = req.body

    const user = await createUserService({email, name, password, phones})

    return res.status(201).json({

        message: "User Created",
        user
    });     
}

export default createUserController