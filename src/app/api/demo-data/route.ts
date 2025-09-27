import { NextResponse } from 'next/server';

let callCount = 0;

export async function GET() {
  callCount++;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({
    message: 'データ取得成功',
    timestamp: new Date().toISOString(),
    callCount,
    data: {
      id: Math.random().toString(36).substr(2, 9),
      value: Math.floor(Math.random() * 1000),
    },
  });
}