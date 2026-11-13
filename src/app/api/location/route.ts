import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { visitorId, latitude, longitude, accuracy } = body;

    if (
      typeof visitorId !== "string" ||
      visitorId.length === 0 ||
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid location data" },
        { status: 400 }
      );
    }

    const location = await prisma.location.create({
      data: {
        visitorId,
        latitude,
        longitude,
        accuracy:
          typeof accuracy === "number" ? accuracy : null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Location saved successfully",
      data: location,
    });
  } catch (error) {
    console.error("Location saving error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to save location" },
      { status: 500 }
    );
  }
}