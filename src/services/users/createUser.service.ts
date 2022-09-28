import appDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { Phone } from "../../entities/user-phones.entity";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const createUserService = async ({email, name, password, phones}: IUserRequest) => {
    const usersRepository = appDataSource.getRepository(User)
    const phoneRepository = appDataSource.getRepository(Phone)

    const usersList = await usersRepository.find()
    const userAlreadyRegistred = usersList.find(user => user.email === email)

    if(userAlreadyRegistred){
        throw new AppError("User already registred")
    }

    const hashedPassword = await hash(password, 10);

    const newUser = usersRepository.create({
        name: name,
        email: email,
        password: hashedPassword,
        active: true
    })

    const newUserSave = await usersRepository.save(newUser)

    for(let i = 0; i<phones.length; i++) {
        const newPhone = phoneRepository.create({
            phone: phones[i],
            user: newUser
        })
        await phoneRepository.save(newPhone)
    }

    const users = await usersRepository.find()
    const user = users.find(user => user.id === newUserSave.id)

    return {...user, password: undefined}    
}

export default createUserService