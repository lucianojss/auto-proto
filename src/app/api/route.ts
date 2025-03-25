import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    message: "Hello, world!",
    success: true,
  };

  return NextResponse.json(data);
}
