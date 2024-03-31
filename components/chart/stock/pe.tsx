import { Snapshot } from "@/server/entity"
import ReactECharts from 'echarts-for-react';
import { useMemo } from "react"

export function PE({ snapshots }: { snapshots: Snapshot[] }) {

    const dataset = useMemo(() => {
        const result = {
            dimensions: ['timestamp', 'PE（静)', 'PE（动）', 'PE（TTM)'],
            source: snapshots.map((s) => ({
                timestamp: s.timestamp,
                'PE（静)': s.PE,
                'PE（动）': s.PE_D,
                'PE（TTM)': s.PE_TTM
            }))
        }
        return result
    }, [snapshots])

    const option = {
        title: { text: 'PE' },
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
            { type: 'line', label: { show: true } },
            { type: 'line', label: { show: true } }
        ],
        tooltip: { trigger: 'axis' }
    }

    return <ReactECharts option={option} />
} 