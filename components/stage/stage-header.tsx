import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { CircleCheck, Star } from "lucide-react";
import { Badge } from "../ui/badge";

export default function StageHeader() {
  return (
    <div className="flex items-center p-4">
      <h1 className="text-2xl font-bold mr-4">Introduction</h1>
      <Badge
        variant="secondary"
        className="bg-green-100 text-green-700 border-green-500 rounded-2xl font-bold"
      >
        <CircleCheck /> Completed
      </Badge>
    </div>
  );
}
