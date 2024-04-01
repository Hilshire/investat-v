import { jwt } from "@/middleware";
import { InveSnapshot } from "@/server/entity";
import { getRepo } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

const { AKTOOL_URL: aktoolUrl = 'http://localhost/' } = process.env;

export const POST = jwt(async function POST(res: NextRequest) {
    try {
        const { positionDetail = {}, timestamp }: any = JSON.parse(await res.text())
        const { totalAsset, totalCost, totalPriceCost } = positionDetail

        if (!totalAsset || !totalCost || !totalPriceCost || !timestamp) throw new Error('error params')

        const repo = await getRepo(InveSnapshot)

        const exist = await repo.findOne({ where: { timestamp } })
        if (exist) throw new Error('data exist')

        const inveSnapshot = new InveSnapshot()
        inveSnapshot.totalAsset = totalAsset
        inveSnapshot.totalCost = totalCost
        inveSnapshot.totalPriceCost = totalPriceCost
        inveSnapshot.timestamp = timestamp
        inveSnapshot.market = JSON.stringify(await getMarketPE())

        return NextResponse.json({ code: 1, data: await repo.save(inveSnapshot) })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ code: 0, error: e + '' })
    }
})

export const GET = jwt(async function GET() {
    const repo = await getRepo(InveSnapshot)

    return NextResponse.json({ code: 1, result: await repo.find({ order: { timestamp: 'ASC' } }) })
})

async function getMarketPE() {
    const res = await fetch(aktoolUrl + 'api/public/stock_sse_summary')

    let oriData = [];
    try {
        oriData = JSON.parse(await res.text()) as any
    } catch (e) {
        throw new Error('error when query market data')
    }

    const peData = oriData.find((d: any) => d["项目"] === "平均市盈率")
    const assetData = oriData.find((d: any) => d["项目"] === "总市值")

    return {
        pe: {
            stock: peData["股票"],
            main: peData["主板"],
            tech: peData["科创板"]
        },
        asset: {
            stock: assetData["股票"],
            main: assetData["主板"],
            tech: assetData["科创板"]
        }
    }
}