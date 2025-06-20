import { redirect } from "next/navigation";

export default function CourseEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/courses/${params.slug}/introduction`);
}
