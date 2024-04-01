"use client"

import { Profit, PE, Price, Ratio } from '@/components/chart/stock/';
import { useMarket } from '@/components/hook';
import axios from '@/server/api';
import { Snapshot } from '@/server/entity';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Stock() {
    const [snapshots, setSnapshots] = useState<Snapshot[]>([])

    const { inveSnapshot, getByTimestamp } = useMarket()

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code')
        getData(code || '').then(r => {
            if (!r.data.code) return
            setSnapshots(r.data.result)
        }).catch(e => console.error(e))
    }, [])

    return <div>
        <Card>
            <Price snapshots={snapshots} />
            <Profit snapshots={snapshots} />
            <Ratio snapshots={snapshots} totalAsset={getByTimestamp(snapshots[0]?.timestamp)?.totalAsset} />
            <PE snapshots={snapshots} />
        </Card>
    </div>
}

function getData(code: string | number) {
    return axios.get('/api/stock', { params: { code } })
}