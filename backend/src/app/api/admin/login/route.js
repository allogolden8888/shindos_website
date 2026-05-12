import { NextResponse } from "next/server";
import { hashPassword, setAdminSession } from "@/lib/auth";
import { readJson } from "@/lib/storage";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const admin = await readJson("admin.json");
    const isValid =
      username === admin.username && hashPassword(password) === admin.passwordHash;

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    await setAdminSession(username);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 },
    );
  }
}
