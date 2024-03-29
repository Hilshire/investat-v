import { NextResponse, NextRequest } from "next/server";
import { Position, Snapshot } from "@/server/entity"
import { getRepo } from "@/utils"
import dayjs from 'dayjs'
import { jwt } from "@/middleware";

const { AKTOOL_URL: aktoolUrl = 'http://localhost/' } = process.env;

export const GET = jwt(async function GET(req: NextRequest) {
  try {
    let accounts = JSON.parse(req.nextUrl.searchParams.get('account') || '[]')
    if (!Array.isArray(accounts)) throw new Error('not an array')
    const repo = await getRepo(Position)
    return NextResponse.json(await repo.find({
      relations: { snapshot: true }, where: accounts.map(account => ({ account }))
    }))
  } catch (e) {
    console.error(e)
    return NextResponse.json({ code: 0, error: e }, { status: 500 })
  }
})

export const PUT = jwt(async function PUT(request: NextRequest) {
  try {
    const req = await request.json()
    const { code, snowballCode, cost, price, count, account, comment } = req || {}

    const time = getTime()
    const year = time.year()

    const aktoolData = await createSnapshot(snowballCode)
    const xqData = Object
      .fromEntries(JSON.parse(aktoolData)
        .map(({ item, value }: { item: string, value: unknown }) => [item, value]))

    const snapshot = formatXq2Snapshot(xqData, code, time)

    const position = new Position()
    position.code = code.trim()
    position.cost = +cost
    position.count = +count
    position.price = +price
    position.snapshot = snapshot
    position.timestamp = +time
    position.year = year
    position.account = account
    position.comment = comment

    const positionRepo = await getRepo(Position)
    const snapshotRepo = await getRepo(Snapshot)
    await snapshotRepo.save(snapshot)
    await positionRepo.save(position)

    return NextResponse.json({ code: 1, result: xqData })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ code: 0, error: e }, { status: 200 });
  }
})

async function createSnapshot(snowBallCode: string) {
  const res = await fetch(aktoolUrl + 'api/public/stock_individual_spot_xq?symbol=' + snowBallCode.toUpperCase())

  return res.text()
}

function getTime() {
  const timeStamp = +new Date()
  const time = dayjs(timeStamp).startOf('day')

  return time
}

function formatXq2Snapshot(xqdata: { [k: string]: any }, code: string, time: dayjs.Dayjs) {
  const {
    '代码': snowballCode,
    '名称': name,
    '现价': currentPrice,
    '52周最高': FTWeekHighest,
    '52周最低': FTWeekLowest,
    '交易所': exchange,
    '市盈率(动)': PE_D,
    '市盈率(静)': PE,
    '市盈率(TTM)': PE_TTM,
    '市净率': PB,
    '基金份额/总股本': outStandingShares,
    '每股收益': EPS,
    '周转率': turnoverRate,
    '净资产中的商誉': goodwill, // 净资产中的商誉
    '今年以来涨幅': increaseThisYear,
    '发行日期': productDate,
    '资产净值/总市值': APC,
    '股息(TTM)': dividendsTTM,
    '股息率(TTM)': dividendsRateTTM,
    '每股净资产': APS,
  } = xqdata

  const snapshot = new Snapshot();

  snapshot.code = code
  snapshot.snowballCode = snowballCode
  snapshot.name = name
  snapshot.FTWeekHighest = FTWeekHighest
  snapshot.FTWeekLowest = FTWeekLowest
  snapshot.exchange = exchange
  snapshot.PE_D = PE_D
  snapshot.PE = PE
  snapshot.PE_TTM = PE_TTM
  snapshot.PB = PB
  snapshot.outStandingShares = outStandingShares
  snapshot.EPS = EPS
  snapshot.turnoverRate = turnoverRate
  snapshot.goodwill = goodwill
  snapshot.increaseThisYear = increaseThisYear
  snapshot.productDate = productDate
  snapshot.APC = APC
  snapshot.dividendsTTM = dividendsTTM
  snapshot.dividendsRateTTM = dividendsRateTTM
  snapshot.APS = APS
  snapshot.timestamp = +time
  snapshot.year = time.year()
  snapshot.currentPrice = currentPrice

  return snapshot
}