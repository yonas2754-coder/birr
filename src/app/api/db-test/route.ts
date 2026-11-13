import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$connect();

    const count = await prisma.location.count();

    return NextResponse.json({
      success: true,
      message: "PostgreSQL connected successfully!",
      totalLocations: count,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}