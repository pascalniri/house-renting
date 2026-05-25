import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error: any) {
    console.error(`GET /api/properties/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch property", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    // Assuming JSON payload for PUT for now (you can upgrade to FormData if editing images is needed)
    
    const updatedProperty = await prisma.property.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ success: true, data: updatedProperty });
  } catch (error: any) {
    console.error(`PUT /api/properties/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, message: "Failed to update property", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.property.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Property deleted successfully" });
  } catch (error: any) {
    console.error(`DELETE /api/properties/${params.id} error:`, error);
    return NextResponse.json(
      { success: false, message: "Failed to delete property", error: error.message },
      { status: 500 }
    );
  }
}
