'use client'

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid"
import { Position } from '@/server/entity/Position'
import axios from '@/server/api';
import { getPositionDetail, calcRatioRow, ratioColumns } from '@/utils/ratio.tsx'
import { calcFundRows, fundColumns } from '@/utils/fundamental'
import { Card, CardContent } from "@mui/material"
import { emitter } from "@/utils/emitt";
import { pick } from "@/utils";
import { Parameters } from "./position/page";

export default function Home() {
  const [latest, setLatest] = useState<Position[]>([])
  const positionDetail = useMemo(() => getPositionDetail(latest), [latest])
  const ratioRows = useMemo<GridRowsProp>(() => calcRatioRow(latest, positionDetail), [positionDetail])
  const fundRows = useMemo<GridRowsProp>(() => calcFundRows(latest), [latest])

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

  let unbind: undefined | Function
  useLayoutEffect(() => {
    unbind && unbind()
    unbind = emitter.on('ratio:refresh', (r) => refresh(r, latest))
  }, [latest])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      时间{(new Date(+latest[0]?.timestamp)).toLocaleString()}
      收益率：{((positionDetail.totalAsset - positionDetail.totalCost) / positionDetail.totalAsset * 100).toFixed(2)}%
      <Card className="mb-8 w-full">
        <CardContent>
          <DataGrid
            rows={ratioRows}
            columns={ratioColumns}
            autoHeight
          />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent>
          <DataGrid rows={fundRows} columns={fundColumns} autoHeight />
        </CardContent>
      </Card>
    </main>
  );
}

function refresh(r: Partial<Position>, latest: Position[]) {
  if (!latest || latest.length === 0) {
    console.log('error row data')
  }
  const target = latest.find(p => p.id === r.id)
  if (!target) return
  const p: Parameters = pick<Position>(target, ['code', 'cost', 'count', 'account', 'price'])
  p.snowballCode = target.snapshot.snowballCode

  axios.put('/api/position', p)
}

function getLatest() {
  return axios.get('/api/position/getLatest', { params: { account: '[1]' } })
}


