import { NextResponse } from "next/server";
import { Position } from "@/server/entity"
import { getRepo } from "@/utils"

export async function GET() {
    try {
        const repo = await getRepo(Position)
        const timestamp = (await repo.createQueryBuilder("position")
            .select('position.timestamp')
            .distinct(true)
            .orderBy("position.timestamp")
            .getOne())?.timestamp

        return NextResponse.json({
            status: 1,
            result: await repo.find({ where: { timestamp }, relations: { snapshot: true } })
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ status: 0, error: e }, { status: 500 })
    }
}