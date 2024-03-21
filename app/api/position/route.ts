import { NextResponse } from "next/server";
import { Position } from "@/server/entity"
import { getRepo } from "@/utils"

// To handle a GET request to /api
export async function GET() {
  try {
    const repo = await getRepo(Position)
    return NextResponse.json(repo)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ status: 0, error: e})
  }
  // Do whatever you want
  return NextResponse.json({ message: "Hello World2" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}