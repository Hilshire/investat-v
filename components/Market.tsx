'use client'

import { Card } from "@mui/material"
import { Asset } from './chart'
import { MarketPE } from "./chart/MarketPE";
import { useMarket } from "./hook";

export function Market() {
    const { inveSnapshot } = useMarket()

    return <Card className="mb-8">
        <Asset inveSnapshot={inveSnapshot} />
        <MarketPE inveSnapshot={inveSnapshot} />
    </Card>
}