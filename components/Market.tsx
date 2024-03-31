'use client'

import { Card } from "@mui/material"
import axios from '@/server/api';
import { useLayoutEffect, useRef, useState } from "react";
import { InveSnapshot } from "@/server/entity";
import { Asset } from './chart'
import { MarketPE } from "./chart/MarketPE";

export function Market() {
    const initialized = useRef(false)
    const [inveSnapshot, setInveSnapshot] = useState<InveSnapshot[]>([])

    useLayoutEffect(() => {
        if (!initialized.current) {
            initialized.current = true

            getInveSnapshot().then(res => {
                if (!res.data.code) return
                setInveSnapshot(res.data.result)
            })
        }
    }, [])

    return <Card className="mb-8">
        <Asset inveSnapshot={inveSnapshot} />
        <MarketPE inveSnapshot={inveSnapshot} />
    </Card>
}

async function getInveSnapshot() {
    return await axios.get('/api/inveSnapshot')
}