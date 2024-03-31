import { Position } from "@/server/entity"
import ReactECharts from 'echarts-for-react';
import { useMemo } from "react"

export function ProfitPE({ positions }: { positions: Position[] }) {

    const dataset = useMemo(() => {
        const result = {
            dimensions: ['name', 'PE（静)', 'PE（TTM)', 'PE（动）'],
            source: positions.map((p) => ({
                name: p.snapshot.name,
                'PE（静)': p.snapshot.PE,
                'PE（动）': p.snapshot.PE_D,
                'PE（TTM)': p.snapshot.PE_TTM
            }))
        }
        return result
    }, [positions])

    const option = {
        title: { text: 'PE' },
        legend: { show: true },
        dataset,
        xAxis: {
            type: 'category'
        },
        yAxis: {
            min: function (value: any) {
                return value.min - 2;
            }
        },
        series: [
            { type: 'bar', label: { show: true, position: 'top' } },
            { type: 'bar', label: { show: true, position: 'top' } },
            { type: 'bar', label: { show: true, position: 'top' } }
        ],
        tooltip: { trigger: 'axis' }
    }

    return <ReactECharts option={option} />
} 