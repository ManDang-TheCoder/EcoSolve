import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateUploadURL } from "@/lib/upload";
import { z } from "zod";

// Schema for upload request
const UploadRequestSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
});

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const validatedData = UploadRequestSchema.parse(body);
    
    // Validate file type
    const allowedContentTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "video/mp4",
      "application/pdf",
    ];
    
    if (!allowedContentTypes.includes(validatedData.contentType)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }
    
    // Generate a pre-signed URL for S3 upload
    const presignedUrl = await generateUploadURL(
      validatedData.filename,
      validatedData.contentType
    );
    
    // Determine file type for frontend use
    let fileType = "DOCUMENT";
    if (validatedData.contentType.startsWith("image/")) {
      fileType = "IMAGE";
    } else if (validatedData.contentType.startsWith("video/")) {
      fileType = "VIDEO";
    }
    
    // Return the URL and metadata
    return NextResponse.json({
      presignedUrl,
      fileType,
      filename: validatedData.filename,
      contentType: validatedData.contentType,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    
    console.error("[UPLOAD_URL_ERROR]", error);
    return NextResponse.json(
      { error: "Error generating upload URL" },
      { status: 500 }
    );
  }
} 