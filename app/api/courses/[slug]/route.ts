import { NextResponse } from "next/server";
import type { Course } from "@/types/course";

const API_BASE_URL = process.env.BACKEND_URL;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = await params;
    const response = await fetch(`${API_BASE_URL}/v1/courses/${slug}`);

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.statusText}`);
    }

    const data: Course = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
