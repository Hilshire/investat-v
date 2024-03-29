import { NextRequest, NextResponse } from "next/server";
import { Position } from "@/server/entity"
import { getRepo } from "@/utils"
import { jwt } from "@/middleware";
import { createQueryBuilder } from "typeorm";

export const GET = jwt(async function GET(req: NextRequest) {
    try {
        let accounts = JSON.parse(req.nextUrl.searchParams.get('account') || '[]')
        if (!Array.isArray(accounts)) throw new Error('not an array')
        const repo = await getRepo(Position)
        const timestamp = (await repo.createQueryBuilder("position")
            .select('position.timestamp')
            .distinct(true)
            .orderBy("position.timestamp", 'DESC')
            .getOne())?.timestamp

        console.log('---hh', timestamp)
        return NextResponse.json({
            code: 1,
            result: await repo.createQueryBuilder('p')
                .leftJoinAndSelect("p.snapshot", "snapshot")
                .where('p.account in (:accounts)', { accounts })
                .andWhere('p.timestamp = :timestamp', { timestamp })
                .getMany()

        })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ code: 0, error: e }, { status: 500 })
    }
})
