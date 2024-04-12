
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany
} from 'typeorm'
import { Task } from './Task'


@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    _id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

}