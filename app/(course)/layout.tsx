import CourseHeader from "@/components/course/course-header";
import { CourseSidebar } from "@/components/course/course-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <CourseSidebar />
      <SidebarInset>
        <CourseHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
