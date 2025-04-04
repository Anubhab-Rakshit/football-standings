import { NextResponse } from "next/server"
import { checkApiStatus } from "@/lib/api-status"

export async function GET() {
  const status = await checkApiStatus()

  return NextResponse.json(status)
}

