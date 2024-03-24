import type { GridColDef } from '@mui/x-data-grid'
import { Position } from "@/server/entity"

export function getPositionDetail(positions: Position[] = []) {
    return {
        totalCost: getTotalCost(positions),
        totalAsset: getTotalAsset(positions),
        totalPriceCost: getTotalPriceCost(positions)
    }
}

export const ratioColumns: GridColDef[] = [
    { field: 'name', headerName: '名称' },
    { field: 'currentPrice', headerName: '现价' },
    { field: 'cost', headerName: '成本' },
    { field: 'price', headerName: '成本价' },
    { field: 'count', headerName: '股数' },
    { field: 'costProfit', headerName: '盈利', type: 'number', valueFormatter: v => v + '%' },
    { field: 'priceProfit', headerName: '按本金盈利', type: 'number', minWidth: 110, valueFormatter: v => v + '%' },
    { field: 'assetRatio', headerName: '持仓', type: 'number', valueFormatter: (v) => v + '%' },
    { field: 'costRatio', headerName: '成本占比', type: 'number', valueFormatter: (v) => v + '%' },
    { field: 'priceRatio', headerName: '已投入本金占比', type: 'number', minWidth: 120, valueFormatter: (v) => v + '%' },
    { field: 'costProfitRatio', headerName: '盈利占比', type: 'number', valueFormatter: v => v + '%' },
    { field: 'priceProfitRatio', headerName: '按本金盈利占比', type: 'number', minWidth: 120, valueFormatter: v => v + '%' },
]

export const calcRatioRow = (positions: Position[], positionDetail: ReturnType<typeof getPositionDetail>) => positions.map(p => {
    const { cost, count } = p
    const { totalAsset, totalCost, totalPriceCost } = positionDetail
    const currCost = cost * count
    const currPrice = p.price * p.count
    const currAsset = p.snapshot.currentPrice * p.count
    const row = {
        id: p.id,
        name: p.snapshot.name,
        cost: p.cost,
        price: p.price,
        count: p.count,
        currentPrice: p.snapshot.currentPrice,
        assetRatio: (p.snapshot.currentPrice * p.count / totalAsset * 100),
        costRatio: (currCost / totalCost * 100),
        priceRatio: (currPrice / totalPriceCost * 100),
        costProfit: (currAsset - currCost) / currCost * 100,
        priceProfit: (currAsset - currPrice) / currPrice * 100,
        costProfitRatio: (currAsset - currCost) / currAsset * 100,
        priceProfitRatio: (currAsset - currPrice) / currAsset * 100,
    }
    Object.keys(row).forEach(k => {
        // @ts-ignore
        if (typeof row[k] === 'number') row[k] = parseFloat(row[k].toFixed(2))
    })
    return row
})

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