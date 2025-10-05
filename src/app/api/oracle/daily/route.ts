import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ date: new Date().toISOString().slice(0,10), memes: ["pepe","wojak"], posts: ["Join the raid ","Flip the switch "] });
}
