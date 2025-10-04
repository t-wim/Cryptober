import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({
    date: new Date().toISOString().slice(0, 10),
    memes: ['Pepe-Pumpkin', 'Wojak-Candle'],
    posts: ['Uptober flips the switch'],
  });
}
