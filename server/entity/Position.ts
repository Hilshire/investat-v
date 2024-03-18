import { Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Snapshot } from "."

@Entity('position')
export class Position {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    code: string

    @Column('int')
    price: number

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