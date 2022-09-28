import appDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

const deleteUserService = async (id: string) => {
    const userRespository = appDataSource.getRepository(User)
    const users = await userRespository.find()
    const user = users.find(user => user.id === id)

    if(!user){
        throw new AppError("User not found", 404)
    }

    await userRespository.delete(id)    
}

export default deleteUserService