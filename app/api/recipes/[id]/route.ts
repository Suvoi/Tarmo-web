import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://dev-tarmo:9136"
    : "http://tarmo:9136";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const res = await fetch(`${API_URL}/recipes/${encodeURIComponent(id)}`);

  if (!res.ok) {
    return NextResponse.json({ error: "Recipe not found" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const res = await fetch(`${API_URL}/recipes/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Recipe not found" }, { status: res.status });
  }

  return new NextResponse(null, { status: res.status });
}