import type { GridColDef } from '@mui/x-data-grid'
import { Position } from "@/server/entity"
import { Link } from '@mui/material'

export const fundColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: '名称',
        renderCell: (d) => <Link style={{ color: 'cadetblue', textDecoration: 'underline' }} href={'/stock?code=' + d.row.code}>{d.row.name}</Link>
    },
    { field: 'dividendsRateTTM', headerName: "分红率", type: 'number', valueFormatter: (v: number) => parseFloat(v.toFixed(3)) + '%' },
    { field: 'PE', headerName: 'PE', type: 'number' },
    { field: 'PE_D', headerName: 'PE(动)', type: 'number' },
    { field: 'PE_TTM', headerName: 'PE(TTM)', type: 'number' },
    { field: 'PB', headerName: 'PB', type: 'number' },
    { field: 'outStandingShares', headerName: '流通股', minWidth: 120, type: 'number' },
    { field: 'EPS', headerName: '每股收益', type: 'number' },
    { field: 'turnoverRate', headerName: "周转率", type: 'number' },
    { field: 'goodwill', headerName: "商誉", type: 'number' },
    { field: 'APC', headerName: "资产净值/总市值", minWidth: 130, type: 'number' },
    { field: 'APS', headerName: "每股净资产", type: 'number' },
]

export const calcFundRows = (positions: Position[]) => positions.map(p => p.snapshot)