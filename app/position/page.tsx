'use client';

import { TextField, Button } from '@mui/material'
import { useState } from 'react';
import axios from 'axios';

type Parameters = {
    code?: string
    snowballCode?: string
    cost?: number
    price?: number
    count?: number
};

const fields = [
    ["股票代码", "code"],
    ["雪球代码", "snowballCode"],
    ["成本", "cost"],
    ["成本价", "price"],
    ["持股数", "count"]
]

export default function position() {
    const [parameters, setParameters] = useState<Parameters>({})

    return <div
        className="m-8"
    >
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
        <Button variant="contained" onClick={submit}>Submit</Button>
    </div>

    function submit() {
        console.log(parameters)
        axios.put('/api/position', parameters).then(res => console.log('---res,', res))
    }
}