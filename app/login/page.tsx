'use client'

import { FormControl, TextField, Button } from '@mui/material';
import axios from '@/server/api';
import { useState } from 'react';

export default function Login() {
    const [claim, setClaim] = useState('');

    return (
        <form className='m-8'>
            <FormControl fullWidth>
                <TextField id="claim" label="claim" multiline value={claim} onChange={(e) => setClaim(e.target.value)} />
            </FormControl>
            <FormControl>
                <Button color="primary" onClick={submit}>submit</Button>
            </FormControl>
        </form>
    );

    function submit() {
        axios.post('/api/login', { claim }).then((res: any) => {
            if (!res.data.code) {
                alert('authentication fail');
            }
        });
    }
}
