import { Snapshot } from "@/server/entity"
import ReactECharts from 'echarts-for-react';
import { useMemo } from "react"

export function Price({ snapshots }: { snapshots: Snapshot[] }) {

    const dataset = useMemo(() => {
        const result = {
            dimensions: ['timestamp', 'price'],
            source: snapshots.map((s) => ({
                timestamp: s.timestamp,
                price: s.currentPrice
            }))
        }
        return result
    }, [snapshots])

    const option = {
        title: { text: '现价' },
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
            min: function (value: any) {
                return value.min - 2;
            }
        },
        series: [
            { type: 'line', label: { show: true } },
        ],
        tooltip: { trigger: 'axis' }
    }

    return <ReactECharts option={option} />
} 