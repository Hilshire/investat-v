'use client'

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Position } from '@/server/entity/Position'
import axios from '@/server/api';

export default function Home() {
  const [latest, setLatest] = useState<Position[]>([])
  const positionDetail = useMemo(() => getPositionDetail(latest), [latest])

  const initialized = useRef(false)

  useLayoutEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      getLatest().then(r => {
        if (Array.isArray(r.data.result))
          setLatest(r.data.result)
      })
    }
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      时间{(new Date(+latest[0]?.timestamp)).toLocaleString()}
      <div>{latest.map(p =>
        <div key={p.id}>
          <p><b>{p.snapshot.name}{p.code}</b></p>
          <p>成本价：{p.price}</p>
          <p>成本：{p.cost}</p>
          <p>股数：{p.count}</p>
          <p>现价：{p.snapshot.currentPrice}</p>
          {JSON.stringify(positionDetail)}
          <p>当前持仓占比：{(p.snapshot.currentPrice * p.count / positionDetail.totalAsset).toFixed(4)}</p>
          <p>成本占比：{(p.cost * p.count / positionDetail.totalCost).toFixed(4)}</p>
          <p>已投入现金占比：{(p.price * p.count / positionDetail.totalPriceCost).toFixed(4)}</p>
          <p>----</p>
          <p>静态PE：{p.snapshot.PE}</p>
          <p>动态PE：{p.snapshot.PE_D}</p>
          <p>PE（TTM）：{p.snapshot.PE_TTM}</p>
          <p>PB：{p.snapshot.PB}</p>
          <p>股息率：{p.snapshot.dividendsRateTTM}</p>
          <p>股息：{p.snapshot.dividendsTTM}</p>
          <p>商誉:{p.snapshot.goodwill}</p>
          <p>流通股：{p.snapshot.outStandingShares}</p>
          <p>每股净资产：{p.snapshot.APS}</p>
          <p>资产净值/总市值：{p.snapshot.APC}</p>
          <p>每股盈利：{p.snapshot.EPS}</p>
          <p>周转率：{p.snapshot.turnoverRate}</p>
        </div>
      )}</div>
    </main>
  );
}

function getLatest() {
  return axios.get('/api/position/getLatest', { params: { account: '[1]' } })
}

function getPositionDetail(positions: Position[] = []) {
  return {
    totalCost: getTotalCost(positions),
    totalAsset: getTotalAsset(positions),
    totalPriceCost: getTotalPriceCost(positions)
  }
}

function getTotalCost(positions: Position[]) {
  let totalCost = 0
  positions.forEach(p => totalCost += p.cost * p.count)
  return +totalCost.toFixed(3)
}

function getTotalAsset(positions: Position[]) {
  let totalAsset = 0
  positions.forEach(p => totalAsset += p.count * p.snapshot.currentPrice)
  return +totalAsset.toFixed(3)
}

function getTotalPriceCost(positions: Position[]) {
  let totalPriceCost = 0
  positions.forEach(p => totalPriceCost += p.count * p.price)
  return +totalPriceCost.toFixed(3)
}
