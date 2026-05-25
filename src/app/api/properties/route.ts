import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const properties = await prisma.property.findMany({
      where: type ? { type } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: properties });
  } catch (error: any) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch properties", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Parse text fields
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
    
    // Validate required fields
    if (!title || !location || isNaN(price) || isNaN(bedrooms) || isNaN(bathrooms) || isNaN(sqft) || !type || !description || !ownerName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Process images
    const images = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    for (const image of images) {
      if (image && image.size > 0) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const url = await uploadImage(buffer, "house-renting/properties");
        imageUrls.push(url);
      }
    }
    
    // Process owner photo
    const ownerPhotoFile = formData.get("ownerPhoto") as File;
    let ownerPhotoUrl = null;
    if (ownerPhotoFile && ownerPhotoFile.size > 0) {
      const buffer = Buffer.from(await ownerPhotoFile.arrayBuffer());
      ownerPhotoUrl = await uploadImage(buffer, "house-renting/owners");
    }

    // Default image if none provided
    const primaryImageUrl = imageUrls.length > 0 
      ? imageUrls[0] 
      : "https://images.unsplash.com/photo-1560518884-ce5872c3666b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    const newProperty = await prisma.property.create({
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
        imageUrls: imageUrls,
        ownerName,
        ownerPhone,
        ownerEmail,
        ownerWhatsapp,
        ownerPhoto: ownerPhotoUrl,
        isPublished: true,
      }
    });

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create property", error: error.message },
      { status: 500 }
    );
  }
}
