import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from "typeorm"
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
    FTWeekHighest: number

    @Column('float')
    FTWeekLowest: number

    @Column('float')
    PE_D: number

    @Column('float')
    PE: number

    @Column('float')
    PE_TTM: number

    @Column('float')
    PB: number

    @Column('bigint')
    outStandingShares: number

    @Column('float')
    EPS: number // earnings per share

    @Column('int')
    turnoverRate: number 

    @Column('int')
    goodwill: number // 净资产中的商誉

    @Column('int')
    increaseThisYear: number

    @Column('int')
    productDate: number //发行日期

    @Column('float')
    APC: number // 资产净值/总市值

    @Column('float')
    dividendsTTM: number

    @Column('int')
    dividendsRateTTM: number

    @Column('float')
    APS: number //每股净资产


    @OneToOne(() => Position)
    @JoinColumn()
    snapshot: Position

    @Column('timestamp')
    timestamp: number

    @Column('int')
    year: number

    @CreateDateColumn()
    createAt: string;
}