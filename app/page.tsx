'use client'

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid"
import { Position } from '@/server/entity/Position'
import axios from '@/server/api';
import { getPositionDetail, calcRatioRow, ratioColumns } from '@/utils/ratio.tsx'
import { calcFundRows, fundColumns } from '@/utils/fundamental'
import { Card, CardContent, RadioGroup, Radio, FormControlLabel, Grid, Button } from "@mui/material"
import { emitter } from "@/utils/emitt";
import { pick } from "@/utils";
import { Parameters } from "./position/page";
import { Day } from "./api/position/days/route";
import { RatioPie } from '@/components/chart/RatioPie'

export default function Home() {
  const [positions, setPositions] = useState<Position[]>([])
  const [days, setDays] = useState<Day[]>([])
  const positionDetail = useMemo(() => getPositionDetail(positions), [positions])
  const ratioRows = useMemo<GridRowsProp>(() => calcRatioRow(positions, positionDetail), [positionDetail])
  const fundRows = useMemo<GridRowsProp>(() => calcFundRows(positions), [positions])

  const initialized = useRef(false)

  const [selectDay, setSelectDay] = useState<string | null>(null)
  const [selectAccount, setSelectAccount] = useState<string | number>(1)

  useLayoutEffect(() => {
    if (!initialized.current) {
      initialized.current = true

      getLatest().then(r => {
        if (Array.isArray(r.data.result)) {
          setPositions(r.data.result)
          setSelectDay(r.data.result[0].timestamp)
        }
      })

      getDays().then(r => setDays(r.data.result))
    }
  }, [])

  let unbind: undefined | Function
  useLayoutEffect(() => {
    unbind && unbind()
    unbind = emitter.on('ratio:refresh', (r) => refresh(r, positions))
  }, [positions])

  return (
    <Grid container spacing={2} className="p-8">
      <Grid item xs={2}>
        <RadioGroup value={selectDay} onChange={(e) => setSelectDay(e.target.value)}>
          {days.map(d => <FormControlLabel key={d.timestamp} value={d.timestamp} control={<Radio />} label={new Date(+d.timestamp).toLocaleDateString()} />)}
        </RadioGroup>
        <RadioGroup value={selectAccount} onChange={e => setSelectAccount(e.target.value)}>
          <FormControlLabel value={1} control={<Radio />} label='普通'></FormControlLabel>
          <FormControlLabel value={2} control={<Radio />} label='红利'></FormControlLabel>
        </RadioGroup>
        <Button onClick={() => handleSubmit(selectDay, selectAccount)}>Submit</Button>
      </Grid>

      <Grid item xs={10}>
        <p>时间{(new Date(+positions[0]?.timestamp)).toLocaleDateString()}</p>
        <p>总资产：{positionDetail.totalAsset}</p>
        <Card className="mb-8 w-full">
          <RatioPie positions={positions} positionDetail={positionDetail}></RatioPie>
        </Card>
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
      </Grid>
    </Grid>
  );

  async function handleSubmit(selectDay: number | string | null, selectAccount: number | string) {
    const latest = await getPositions({ timeStamp: selectDay, account: `[${selectAccount}]` })
    setPositions(latest.data.result)
  }
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



function getLatest(params = { account: '[1]' }) {
  return axios.get('/api/position/getLatest', { params })
}

function getDays() {
  return axios.get('/api/position/days')
}

function getPositions(params: any) {
  return axios.get('/api/position', { params })
}


