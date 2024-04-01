import { Snapshot } from "@/server/entity"
import ReactECharts from 'echarts-for-react';
import { useMemo } from "react"

export function Ratio({ snapshots, totalAsset }: { snapshots: Snapshot[], totalAsset: number | undefined }) {

    const dataset = useMemo(() => {
        const result = {
            dimensions: ['timestamp', 'ratio'],
            source: snapshots.map((s) => ({
                timestamp: s.timestamp,
                ratio: (s.currentPrice * s.position.count / (totalAsset || Infinity) * 100).toFixed(2)
            }))
        }
        return result
    }, [snapshots])

    const option = {
        title: { text: '持仓占比' },
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
            },
            axisLabel: {
                formatter: (v: number) => v + '%'
            }
        },
        series: [
            { type: 'line', label: { show: true, formatter: (v: any) => v.data.ratio + '%' } },
        ],
        tooltip: { trigger: 'axis' }
    }

    return <ReactECharts option={option} />
} 