import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Cek apakah user ada dan password cocok
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 400 }
      );
    }

    // Generate JWT token (isi payload bisa ditambahin sesuai kebutuhan)
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string, // Pastikan buat env variable JWT_SECRET
      { expiresIn: '1h' }
    );

    // Kirimkan token ke client
    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
