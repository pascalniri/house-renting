import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    let isAuthenticated = false;
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || 'super-secret-fallback-key-do-not-use-in-production'
        );
        await jwtVerify(token, secret);
        isAuthenticated = true;
      } catch (e) {}
    }

    const whereClause: any = { id };
    if (!isAuthenticated) whereClause.isPublished = true;

    const property = await prisma.property.findFirst({
      where: whereClause,
    });

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Property not found or is not published" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error: any) {
    console.error(`GET /api/properties/[id] error:`, error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch property", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      
      const title = formData.get("title") as string;
      const location = formData.get("location") as string;
      const price = parseFloat(formData.get("price") as string);
      const bedrooms = parseInt(formData.get("bedrooms") as string, 10);
      const bathrooms = parseFloat(formData.get("bathrooms") as string);
      const sqft = parseInt(formData.get("sqft") as string, 10);
      const type = formData.get("type") as string;
      const description = formData.get("description") as string;
      
      const ownerName = formData.get("ownerName") as string;
      const ownerPhone = formData.get("ownerPhone") as string || null;
      const ownerEmail = formData.get("ownerEmail") as string || null;
      const ownerWhatsapp = formData.get("ownerWhatsapp") as string || null;

      // Existing images that were kept in the UI
      const existingImages = formData.getAll("existingImages") as string[];

      // New images added in the UI
      const newImagesFiles = formData.getAll("images") as File[];
      const newImageUrls: string[] = [];

      const { uploadImage } = await import("@/lib/cloudinary");

      for (const image of newImagesFiles) {
        if (image && image.size > 0) {
          const buffer = Buffer.from(await image.arrayBuffer());
          const url = await uploadImage(buffer, "house-renting/properties");
          newImageUrls.push(url);
        }
      }

      const allImageUrls = [...existingImages, ...newImageUrls];
      const primaryImageUrl = allImageUrls.length > 0 ? allImageUrls[0] : "";

      const updatedProperty = await prisma.property.update({
        where: { id },
        data: {
          title,
          location,
          price,
          bedrooms,
          bathrooms,
          sqft,
          type,
          description,
          imageUrl: primaryImageUrl,
          imageUrls: allImageUrls,
          ownerName,
          ownerPhone,
          ownerEmail,
          ownerWhatsapp,
        },
      });

      return NextResponse.json({ success: true, data: updatedProperty });
    } else {
      // Fallback for purely JSON updates if any
      const data = await request.json();
      const updatedProperty = await prisma.property.update({
        where: { id },
        data,
      });
      return NextResponse.json({ success: true, data: updatedProperty });
    }
  } catch (error: any) {
    console.error(`PUT /api/properties/[id] error:`, error);
    return NextResponse.json(
      { success: false, message: "Failed to update property", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Property deleted successfully" });
  } catch (error: any) {
    console.error(`DELETE /api/properties/[id] error:`, error);
    return NextResponse.json(
      { success: false, message: "Failed to delete property", error: error.message },
      { status: 500 }
    );
  }
}
