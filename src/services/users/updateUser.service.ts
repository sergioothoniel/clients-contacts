import appDataSource from "../../data-source"
import { Phone } from "../../entities/user-phones.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"
import { IUserUpdate } from "../../interfaces/users"

const updateUserService = async (id: string, data: IUserUpdate ) =>{

    const usersRepository = appDataSource.getRepository(User)
    const users = await usersRepository.find()
    const user = users.find(user => user.id === id)

    if(!user){
        throw new AppError("User not found", 404)
    }

    let newData: any ={}
    
    if(data.email){
        const emailAlreadyRegistred = users.find(user => user.email === data.email)

        if(emailAlreadyRegistred){
            throw new AppError("Email already registred")
        }    
        
        newData.email = data.email
    }

    

    if(data.phones){
        
        const userPhonesIdList = user.phones.map(phones => phones.id)

        const phonesRepository = appDataSource.getRepository(Phone)
        const phones = await phonesRepository.find()        
        const phonesToDelete = phones.filter(phone => userPhonesIdList.includes(phone.id))       
        
        for(let i = 0; i<phonesToDelete.length; i++){
            await phonesRepository.delete(phonesToDelete[i]!.id)
        }

        for(let i = 0; i<data.phones.length; i++){
            const newPhone = phonesRepository.create({
                phone: data.phones[i],
                user: user
            })
            await phonesRepository.save(newPhone)
        }
    }

    if(data.name){
        newData.name = data.name
    }

    await usersRepository.update({id: id}, newData)

    const usersUpdated = await usersRepository.find()
    const userUpdated = usersUpdated.find(user => user.id === id)

    return {...userUpdated, password: undefined}

}

export default updateUserService