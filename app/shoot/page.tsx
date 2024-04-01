'use client'

import { Market } from '@/components'
import { Card } from "@mui/material"
import axios from "@/server/api"
import { Snapshot } from '@/server/entity'
import { useLayoutEffect, useRef, useState } from 'react'
import { AnyKeyLine, AnyPositionFnLine } from '@/components/chart'
import { useMarket } from '@/components/hook'

export default function Shoot() {
    const [sps, setSps] = useState<Snapshot[]>([])

    const initialized = useRef(false)

    const { getByTimestamp } = useMarket()

    useLayoutEffect(() => {
        if (!initialized.current) {
            initialized.current = true

            getAll().then(r => {
                if (Array.isArray(r.data.result)) {
                    setSps(r.data.result.filter((p: any) => p?.position?.account === 1))
                }
            })
        }
    }, [])

    return <div>
        <Market />

        <Card>
            <AnyKeyLine snapshots={sps} spKey='currentPrice' option={{ title: { text: '股价' } }} />
            <AnyPositionFnLine
                snapshots={sps}
                fn={(sp) => ((sp.currentPrice - sp.position?.cost) / sp.currentPrice * 100).toFixed(2)}
                option={{
                    title: { text: '盈利' },
                    yAxis: { axisLabel: { formatter: (v: number) => v + '%' } },
                }}
            />
            <AnyPositionFnLine snapshots={sps} fn={(sp) => Math.round(sp.position?.cost * sp.position?.count)} option={{ title: { text: '持仓' } }} />
            <AnyPositionFnLine
                snapshots={sps}
                fn={(sp, time) => (sp.position?.cost * sp.position?.count / (getByTimestamp(time)?.totalAsset || Infinity) * 100).toFixed(2)}
                option={{
                    title: { text: '持仓占比' },
                    yAxis: { axisLabel: { formatter: (v: number) => v + '%' } },
                }}
            />
            <AnyPositionFnLine snapshots={sps} fn={(sp) => sp.position?.cost} option={{ title: { text: '成本' } }} />
            <AnyPositionFnLine snapshots={sps} fn={(sp) => sp.position?.price} option={{ title: { text: '买入价' } }} />
        </Card>

        <Card>
            <AnyKeyLine snapshots={sps} spKey='PE' option={{ title: { text: 'PE' } }} />
            <AnyKeyLine snapshots={sps} spKey='PE_D' option={{ title: { text: 'PE(D)' } }} />
            <AnyKeyLine snapshots={sps} spKey='PE_TTM' option={{ title: { text: 'PE(TTM)' } }} />
            <AnyKeyLine snapshots={sps} spKey='dividendsRateTTM' option={{ title: { text: '股息率' } }} />
            <AnyKeyLine snapshots={sps} spKey='PB' option={{ title: { text: 'PB' } }} />
        </Card>
    </div>
}

function getAll() {
    return axios.get('/api/stock/all')
}
