export interface IUserRequest{
    name: string
    email: string
    phones: string[]
    password: string
}

export interface IUserUpdate{
    name?: string
    email?: string
    phones?: string[]    
}