import { InveSnapshot } from "@/server/entity"
import ReactECharts from 'echarts-for-react';
import { useMemo } from "react"

export function Asset({ inveSnapshot }: { inveSnapshot: InveSnapshot[] }) {

    const dataset = useMemo(() => {
        const result = {
            dimensions: ['timestamp', 'asset'],
            source: inveSnapshot.map((s) => ({
                timestamp: s.timestamp,
                asset: s.totalAsset
            }))
        }
        return result
    }, [inveSnapshot])

    const option = {
        title: { text: '总资产' },
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
                return value.min - 2000;
            }
        },
        series: [
            { type: 'line', label: { show: true } },
        ],
        tooltip: { trigger: 'axis' }
    }

    return <ReactECharts option={option} />
} 