import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

export interface JwtDecode {
  token: string
}

export default (handler?: (...args: any[]) => Promise<NextResponse>) => async (req: NextRequest) => {
  try {
    if (!req.cookies.has('token')) {
      return handlerError();
    }
    try {
      jwt.verify(req.cookies.get('token')?.value || '', process.env.SECRET_KEY || '');
      return handler?.(req);
    } catch (e) {
      console.error(e);
      return handlerError();
    }
  } catch (e) {
    console.error(e);
    return handlerError();
  }
};

function handlerError() {
  return NextResponse.json({ code: 2 })
}
