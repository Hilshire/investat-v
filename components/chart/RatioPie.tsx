import { Position } from "@/server/entity"
import ReactECharts from 'echarts-for-react';
import { useMemo } from "react"

interface Props {
    positions: Position[];
    positionDetail: any;
}

export function RatioPie(props: Props) {
    const { positions, positionDetail } = props

    const assetData = useMemo(() => {
        return positions.map(p => ({
            name: p.snapshot.name,
            value: p.count * p.snapshot.currentPrice
        })).sort((p, n) => n.value - p.value)
    }, [positions])

    const priceData = useMemo(() => {
        return positions.map(p => ({
            name: p.snapshot.name,
            value: p.count * p.price
        })).sort((p, n) => n.value - p.value)
    }, [positions])

    const costData = useMemo(() => {
        return positions.map(p => ({
            name: p.snapshot.name,
            value: p.count * p.cost
        })).sort((p, n) => n.value - p.value)
    }, [positions])

    const earnData = useMemo(() =>
        positions.map(p =>
            (p.snapshot.currentPrice - p.cost) / p.cost
        )
        , [positions])

    const options = {
        title: [
            {
                subtext: '持仓占比',
                left: '16.67%',
                top: '45%',
                textAlign: 'center',
                subtextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            {
                subtext: '成本占比',
                left: '50%',
                top: '45%',
                textAlign: 'center',
                subtextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            {
                subtext: '投入资金占比',
                left: '83.33%',
                top: '45%',
                textAlign: 'center',
                subtextStyle: {
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            }
        ],
        legend: {
            show: true,
            orient: 'horizontal',
        },
        xAxis: {
            type: 'category',
            data: positions.map(p => p.snapshot.name)
        },
        yAxis: {
            type: 'value'
        },
        grid: { top: '55%' },
        series: [{
            type: 'pie',
            data: assetData,
            radius: '50%',
            center: ['50%', '50%'],
            top: 0,
            bottom: '50%',
            left: 0,
            right: '66.6667%',
            tooltip: {
                trigger: 'item',
                formatter: '{d}%'
            },
        }, {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: costData,
            top: 0,
            bottom: '50%',
            left: '33.3333%',
            right: '33.3333%',
            tooltip: {
                trigger: 'item',
                formatter: '{d}%'
            },
        }, {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: priceData,
            top: 0,
            bottom: '50%',
            left: '66.6667%',
            right: 0,
            tooltip: {
                trigger: 'item',
                formatter: '{d}%'
            },
        }, {
            type: 'bar',
            data: earnData,
            colorBy: 'data',
            label: {
                show: true,
                formatter: (p: any) => (p.data * 100).toFixed(2) + '%',
                position: 'top'
            },
            tooltip: {
                trigger: 'axis',
                formatter: (p: any) => (p.data * 100).toFixed(2) + '%',
            },
        }]
    }

    return <ReactECharts
        style={{ height: '36rem' }}
        option={options}
    />
}