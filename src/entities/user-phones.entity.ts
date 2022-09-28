import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";

@Entity("user_phones")
export class Phone{
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    phone: string;

    @ManyToOne((type) => User)
    user: User  
   
}