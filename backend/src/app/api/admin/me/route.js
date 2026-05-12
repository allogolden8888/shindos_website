import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/auth";

export async function GET() {
  const isAuthenticated = await hasAdminSession();
  return NextResponse.json({ authenticated: isAuthenticated });
}
