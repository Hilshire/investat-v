import { InveSnapshot } from "@/server/entity"
import ReactECharts from 'echarts-for-react';
import { useMemo } from "react"

export function MarketPE({ inveSnapshot }: { inveSnapshot: InveSnapshot[] }) {

    const dataset = useMemo(() => {
        const result = {
            dimensions: ['timestamp', '股票', '主板', '科创板'],
            source: inveSnapshot.map((s) => {
                if (!s.market) return

                const pe = JSON.parse(s.market).pe
                return {
                    timestamp: s.timestamp,
                    '股票': pe.stock,
                    '主板': pe.main,
                    '科创板': pe.tech
                }
            })
        }
        return result
    }, [inveSnapshot])

    const option = {
        title: { text: '平均市盈率' },
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
            { type: 'line', label: { show: true } },
        ],
        tooltip: { trigger: 'axis' }
    }

    return <ReactECharts option={option} />
} 