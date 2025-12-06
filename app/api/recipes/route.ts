import { NextResponse } from 'next/server'

const API_URL =
  process.env.NODE_ENV === 'development' ? 'http://dev-tarmo:9136' : 'http://tarmo:9136'

export async function GET() {
  const res = await fetch(`${API_URL}/recipes/`)
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()

  const res = await fetch(`${API_URL}/recipes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
