import { Position, Snapshot } from "@/server/entity"
import ReactECharts from 'echarts-for-react';
import { useMemo } from "react"

export function Profit({ snapshots }: { snapshots: Snapshot[] }) {

    const dataset = useMemo(() => {
        const result = {
            dimensions: ['timestamp', 'profit', 'dividendsRateTTM'],
            source: snapshots.map((s) => ({
                timestamp: s.timestamp,
                profit: (s.currentPrice - s.position.price) / s.currentPrice * 100,
                dividendsRateTTM: s.dividendsRateTTM
            }))
        }
        return result
    }, [snapshots])

    const option = {
        title: { text: '盈利和分红' },
        legend: { show: true },
        dataset,
        xAxis: {
            type: 'category',
            axisLabel: {
                formatter: function (v: string) {
                    return new Date(+v).toLocaleDateString()
                }
            }
        },
        yAxis: {
            axisLabel: {
                formatter: function (v: number) {
                    return (v).toFixed(2) + '%'
                }
            }
        },
        series: [
            {
                type: 'line',
                label: { show: true, formatter: (v: any) => v?.data?.profit && v.data.profit.toFixed(2) + '%' }
            },
            {
                type: 'line',
                label: { show: true, formatter: (v: any) => v.data.dividendsRateTTM.toFixed(2) + '%' }
            }
        ],
        tooltip: { trigger: 'axis' }
    }

    return <ReactECharts option={option} />
} 