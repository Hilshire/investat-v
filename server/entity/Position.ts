import {
    Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Relation
} from "typeorm"
import { Snapshot } from "."

@Entity('position')
export class Position {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column('varchar', { length: 15 })
    code: string

    @Column('float')
    cost: number // 成本

    @Column('float')
    price: number // 成本价

    @Column('int')
    count: number

    @Column('bigint')
    timestamp: number

    @Column('int')
    year: number

    @OneToOne(() => Snapshot, (snapshot) => snapshot.position)
    @JoinColumn()
    snapshot: Relation<Snapshot>

    @CreateDateColumn()
    createAt: string;

    @UpdateDateColumn()
    lastUpdateAt: string;
}