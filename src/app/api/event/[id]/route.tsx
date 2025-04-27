import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { verifyToken } from '@/lib/middleware';

const prisma = new PrismaClient();
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(params.id) },
    include: { rsvps: true },
  });
  return NextResponse.json(event);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const event = await prisma.event.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(event);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const event = await prisma.event.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ event });
}

export async function verifyToken(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
  
    if (!token) {
      return NextResponse.json(
        { error: 'Token tidak ditemukan' },
        { status: 401 }
      );
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded;
    } catch (error) {
      return NextResponse.json(
        { error: 'Token tidak valid' },
        { status: 401 }
      );
    }
  }
  export async function GET(request: Request) {
    const user = await verifyToken(request);
    if (user.error) return user;