import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const { user_id, title, description, date_time, location, theme, music_url } = await request.json();
  const link_slug = title.toLowerCase().replace(/ /g, '-') + '-' + user_id().slice(0, 6);

  const event = await prisma.event.create({
    data: { user_id, title, description, date_time: new Date(date_time), location, theme, music_url, link_slug },
  });

  return NextResponse.json(event);
}
