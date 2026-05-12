import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/auth";
import { readJson } from "@/lib/storage";
import AdminEditor from "./AdminEditor";

export const metadata = {
  title: "Admin panel",
};

export default async function AdminPage() {
  const isAuthenticated = await hasAdminSession();
  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  const content = await readJson("content.json");
  return <AdminEditor initialContent={content} />;
}
