import { Request, Response } from "express"
import listUserService from "../../services/users/listUser.service"

const listUserController =async (req: Request, res: Response) => {

    const users = await listUserService()

    return res.status(200).json(users)    
}

export default listUserController