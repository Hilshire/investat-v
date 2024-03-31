"use client"

import { Profit, PE, Price } from '@/components/chart/stock/';
import axios from '@/server/api';
import { Snapshot } from '@/server/entity';
import { Card } from '@mui/material';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function Stock() {
    const code = useSearchParams().get('code')
    const [snapshots, setSnapshots] = useState<Snapshot[]>([])

    useEffect(() => {
        getData(code || '').then(r => {
            if (!r.data.status) return
            setSnapshots(r.data.result)
        }).catch(e => console.error(e))
    }, [])

    return <div>
        <Card>
            <Price snapshots={snapshots} />
            <Profit snapshots={snapshots} />
            <PE snapshots={snapshots} />
        </Card>
    </div>
}

function getData(code: string | number) {
    return axios.get('/api/stock', { params: { code } })
}