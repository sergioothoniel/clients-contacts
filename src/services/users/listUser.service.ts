import appDataSource from "../../data-source"
import { User } from "../../entities/user.entity"

const listUserService = async () =>{
    const userRepository = appDataSource.getRepository(User)

    const users = await userRepository.find()

    const usersWithNoPassword = users.map(user => {
        return {...user, password: undefined}
    })

    return usersWithNoPassword
}


export default listUserService