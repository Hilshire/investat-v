'use client'

import axios from '@/server/api';
import { InveSnapshot } from '@/server/entity';
import { useLayoutEffect, useRef, useState } from 'react';

export function useMarket() {
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

    function getByTimestamp(time: number | string | undefined) {
        if (!time) return
        return inveSnapshot.find(i => i.timestamp === time)
    }

    return {
        inveSnapshot,
        getByTimestamp
    }
}

async function getInveSnapshot() {
    return await axios.get('/api/inveSnapshot')
}