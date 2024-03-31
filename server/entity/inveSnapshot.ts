import {
    Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn, UpdateDateColumn,
} from "typeorm"

@Entity('inveSnapshot')
export class InveSnapshot {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column('bigint')
    timestamp: number

    @Column('float')
    totalAsset: number

    @Column('float')
    totalCost: number

    @Column('float')
    totalPriceCost: number

    @Column('json')
    market: string

    @CreateDateColumn()
    createAt: string;

    @UpdateDateColumn()
    lastUpdateAt: string;
}