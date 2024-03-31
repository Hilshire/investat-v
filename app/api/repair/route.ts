import { IsNull } from 'typeorm'
import { Snapshot } from "@/server/entity";
import { getRepo } from "@/utils";
import { NextResponse } from "next/server";

export async function POST() {
    const repo = await getRepo(Snapshot)

    const dirties = (await repo.find({
        relations: {
            position: true
        }
    })).filter(p => !p.position)

    await Promise.all(dirties.map(d => repo.delete(d.id)))

    return NextResponse.json({
        status: 1,
        result: dirties
    })


}