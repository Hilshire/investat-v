import { NextResponse } from "next/server";
import { Position } from "@/server/entity"
import { getRepo } from "@/utils"
import { jwt } from "@/middleware";


export const GET = jwt(async function GET() {
    try {
        const repo = await getRepo(Position)
        const days = await repo.createQueryBuilder("position")
            .select('position.timestamp')
            .distinct(true)
            .orderBy("position.timestamp")
            .getMany()
        return NextResponse.json({ code: 1, result: days })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ code: 0, error: e }, { status: 500 })
    }
})
