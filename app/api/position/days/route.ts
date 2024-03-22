import { NextResponse, NextRequest } from "next/server";
import { Position, Snapshot } from "@/server/entity"
import { getRepo } from "@/utils"


export async function GET() {
    try {
        const repo = await getRepo(Position)
        const days = await repo.createQueryBuilder("position")
            .select('position.timestamp')
            .distinct(true)
            .orderBy("position.timestamp")
            .getMany()
        return NextResponse.json({ status: 1, result: days })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ status: 0, error: e }, { status: 500 })
    }
}
