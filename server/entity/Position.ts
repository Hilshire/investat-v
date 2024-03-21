import { Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Snapshot } from "."

@Entity('position')
export class Position {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column('varchar', { length: 15})
    code: string

    @Column('int')
    cost: number // 成本

    @Column('int')
    price: number // 成本价

    @Column('int')
    count: number

    @Column('timestamp')
    timestamp: number

    @Column('int')
    year: number

    @OneToOne(() => Snapshot)
    @JoinColumn()
    snapshot: Snapshot

    @CreateDateColumn()
    createAt: string;
  
    @UpdateDateColumn()
    lastUpdateAt: string;
}