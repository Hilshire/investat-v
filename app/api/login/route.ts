import { NextRequest, NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

export const POST = async (req: NextRequest) => {
    const { claim } = await req.json();

    try {
        if (compareSync(claim, process.env.CLAIM || '')) {
            const jwt = sign(
                {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                },
                process.env.SECRET_KEY || '',
            );

            const res = NextResponse.json({ code: 2, path: '/' })

            res.cookies.set('token', jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60,
                path: '/',
            });

            return res
        } else {
            console.error('[auth] error claim', claim)
            return NextResponse.json({ code: 0, message: 'error claim' });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ code: 0, message: 'error when login' });
    }
};

