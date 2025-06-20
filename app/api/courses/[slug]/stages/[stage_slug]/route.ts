import { NextResponse } from "next/server";
import { StageDetail } from "@/types/stage";

const API_BASE_URL = process.env.BACKEND_URL;

export async function GET(
  _: Request,
  { params }: { params: { slug: string; stage_slug: string } },
) {
  try {
    const { slug, stage_slug } = await params;
    const response = await fetch(
      `${API_BASE_URL}/v1/courses/${slug}/stages/${stage_slug}`,
    );

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.statusText}`);
    }

    const data: StageDetail = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
