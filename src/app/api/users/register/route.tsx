import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const password_hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password_hash },
  });

  return NextResponse.json(user);
}



