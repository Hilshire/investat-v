import { NextResponse, NextRequest } from "next/server";
import { Snapshot } from "@/server/entity"
import { getRepo } from "@/utils"
import { jwt } from "@/middleware";

export const GET = jwt(async function Get(req: NextRequest) {
    try {
        const repo = await getRepo(Snapshot)

        return NextResponse.json({
            code: 1, result: await repo.find({
                relations: ['position'],
            })
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ code: 0, error: e + '' }, { status: 500 })
    }
})