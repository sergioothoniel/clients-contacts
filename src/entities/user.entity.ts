import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Phone } from "./user-phones.entity";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @OneToMany((type) => Phone, (phone) => phone.user, {eager: true})
    phones: Phone[];

    @Column()
    @Exclude()
    password: string;

    @Column()
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
   
}