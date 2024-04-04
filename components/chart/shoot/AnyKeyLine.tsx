import { Snapshot } from "@/server/entity"
import ReactECharts from 'echarts-for-react';
import { useMemo } from "react"

export function AnyKeyLine({ snapshots, spKey, option = {} }: { snapshots: Snapshot[], spKey: keyof Snapshot, option?: any }) {
    const names = useMemo(() => {
        const names: string[] = []
        snapshots.forEach(sp => {
            if (sp.name in names) return
            names.push(sp.name)
        })
        return names
    }, [snapshots])

    const groupByTime = useMemo(() => {
        const result: Record<string, Snapshot[]> = {}

        snapshots.forEach(sp => {
            if (result[sp.timestamp]) {
                result[sp.timestamp].push(sp)
            } else {
                result[sp.timestamp] = [sp]
            }
        })

        return result
    }, [snapshots])


    const dataset = useMemo(() => {
        const dimensions = [
            'timestamp',
            ...snapshots.map(s => s.name),
        ]
        const source = Object.keys(groupByTime).map(time => {
            const result: any = { timestamp: +time }

            groupByTime[time].forEach(sp => result[sp.name] = sp[spKey])

            return result
        }).sort((p, n) => p.timestamp - n.timestamp)

        const result = [{
            dimensions,
            source
        }]

        return result
    }, [snapshots])

    const baseOption = {
        title: { text: '?' },
        legend: { show: true, type: 'scroll', bottom: 0 },
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
        series: names.map(() => ({ type: 'line', label: { show: true } })),
        tooltip: { trigger: 'axis' },
    }

    return <ReactECharts option={{ ...baseOption, ...option }} style={{ height: '500px' }} />
} 