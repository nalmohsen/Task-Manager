

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm'
import { Users } from './User';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    _id: number

    @Column()
    task: string

    @Column()
    dateScheduled: string

    @ManyToOne(() => Users, user => user.tasks)
    user: Users;

    @Column({ default: false })
    isImp: Boolean

    @Column({ default: false })
    status: Boolean

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

}