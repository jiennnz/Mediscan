import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

if (!process.env.JWT_SECRET) {
  console.log("Please add your JWT_SECRET to .env.local");
  throw new Error("Please add your JWT_SECRET to .env.local");
}

const key = Buffer.from(process.env.JWT_SECRET, "hex");

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = await getSession();
  if (!session) return;

  // Refresh the session so it doesn't expire
  session.expires = new Date(Date.now() + 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(session),
    httpOnly: process.env.NODE_ENV === "production",
    expires: session.expires,
  });

  return res;
}
