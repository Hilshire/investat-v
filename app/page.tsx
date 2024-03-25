'use client'

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid"
import { Position } from '@/server/entity/Position'
import axios from '@/server/api';
import { getPositionDetail, calcRatioRow, ratioColumns } from '@/utils/ratio'
import { calcFundRows, fundColumns } from '@/utils/fundamental'
import { Divider } from "@/components/Divider";

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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      时间{(new Date(+latest[0]?.timestamp)).toLocaleString()}
      <DataGrid style={{ width: '100%' }} rows={ratioRows} columns={ratioColumns} autoHeight />
      <Divider />
      <DataGrid style={{ width: '100%' }} rows={fundRows} columns={fundColumns} autoHeight />
    </main>
  );
}

function getLatest() {
  return axios.get('/api/position/getLatest', { params: { account: '[1]' } })
}


