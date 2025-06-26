import { NextResponse } from "next/server";
import type { UserCourse } from "@/types/course";
import { authClient } from "@/lib/auth-client";

const API_BASE_URL = process.env.BACKEND_URL;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = await params;

    const { data: jwt } = await authClient.token({
      fetchOptions: {
        headers: request.headers,
      },
    });

    const response = await fetch(`${API_BASE_URL}/v1/user/courses/${slug}`, {
      headers: {
        Authorization: `Bearer ${jwt?.token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: response.json() },
        { status: response.status },
      );
    }

    const data: UserCourse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
