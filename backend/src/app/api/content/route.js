import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/auth";
import { readJson, writeJson } from "@/lib/storage";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.FRONTEND_ORIGIN || "*",
  "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET() {
  try {
    const content = await readJson("content.json");
    return NextResponse.json(content, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to read content" },
      { status: 500, headers: corsHeaders },
    );
  }
}

export async function PUT(request) {
  const isAuthorized = await hasAdminSession();
  if (!isAuthorized) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401, headers: corsHeaders },
    );
  }

  try {
    const payload = await request.json();
    await writeJson("content.json", payload);
    return NextResponse.json(
      { success: true, message: "Content updated" },
      { headers: corsHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update content" },
      { status: 500, headers: corsHeaders },
    );
  }
}
