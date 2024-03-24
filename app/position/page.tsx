'use client';

import { TextField, Button, Select, MenuItem, FormControl } from '@mui/material'
import { useState } from 'react';
import axios from '@/server/api';

type Parameters = {
    code?: string
    snowballCode?: string
    cost?: number
    price?: number
    count?: number
    account?: number
};

const fields = [
    ["股票代码", "code"],
    ["雪球代码", "snowballCode"],
    ["成本", "cost"],
    ["成本价", "price"],
    ["持股数", "count"],
]

export default function position() {
    const [parameters, setParameters] = useState<Parameters>({})

    return <div className="m-8">
        {
            fields.map(f => <TextField
                fullWidth
                key={f[1]} id={f[1]} label={f[0]}
                variant="standard"
                margin="normal"
                onInput={e =>
                    setParameters({ ...parameters, [f[1]]: (e.target as HTMLInputElement).value })
                } />
            )
        }
        <FormControl fullWidth variant="standard" margin='normal'>
            <Select
                fullWidth
                value={1}
                onChange={e => setParameters({ ...parameters, account: +e.target.value })}
                label="账号"
            >
                <MenuItem value={1}>主账号</MenuItem>
                <MenuItem value={2}>红利账号</MenuItem>
            </Select>
        </FormControl>
        <Button variant="contained" onClick={submit}>Submit</Button>
    </div>

    function submit() {
        axios.put('/api/position', parameters)
    }
}