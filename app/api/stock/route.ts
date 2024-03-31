import { NextResponse, NextRequest } from "next/server";
import { Position, Snapshot } from "@/server/entity"
import { getRepo } from "@/utils"
import { jwt } from "@/middleware";

export const GET = jwt(async function Get(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get('code')
        if (!code) throw new Error('no stock code')

        const repo = await getRepo(Snapshot)

        return NextResponse.json({
            status: 1, result: await repo.find({
                relations: ['position'],
                where: { code }
            })
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ code: 0, error: e }, { status: 500 })
    }
})