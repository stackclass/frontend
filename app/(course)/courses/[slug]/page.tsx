"use client";

import { redirect, useParams } from "next/navigation";

export default function CourseEntryPage() {
  const { slug } = useParams<{
    slug: string;
  }>();
  redirect(`/courses/${slug}/introduction`);
}
