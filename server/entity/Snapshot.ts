import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, Relation } from "typeorm"
import { Position } from "."

@Entity('snapshot')
export class Snapshot {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column('varchar', { length: 15 })
    code: string

    @Column('varchar', { length: 15 })
    snowballCode: string

    @Column('varchar', { length: 15 })
    name: string

    @Column('float')
    currentPrice: number

    @Column('float')
    FTWeekHighest: number // 52周最高

    @Column('float')
    FTWeekLowest: number

    @Column('varchar', { length: 15 })
    exchange: string

    @Column('float')
    PE_D: number

    @Column('float')
    PE: number

    @Column('float')
    PE_TTM: number

    @Column('float')
    PB: number

    @Column('bigint')
    outStandingShares: number // 总股本

    @Column('float')
    EPS: number // earnings per share

    @Column('float', { nullable: true })
    turnoverRate: number

    @Column('float', { nullable: true })
    goodwill: number // 净资产中的商誉

    @Column('float')
    increaseThisYear: number

    @Column('bigint', { nullable: true })
    productDate: number //发行日期

    @Column('float')
    APC: number // 资产净值/总市值

    @Column('float', { nullable: true })
    dividendsTTM: number

    @Column('float', { nullable: true })
    dividendsRateTTM: number

    @Column('float')
    APS: number //每股净资产

    @OneToOne(() => Position, position => position.snapshot)
    position: Relation<Position>

    @Column('bigint')
    timestamp: number

    @Column('int')
    year: number

    @CreateDateColumn()
    createAt: string;
}