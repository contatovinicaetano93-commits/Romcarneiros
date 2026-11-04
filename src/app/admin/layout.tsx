import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Sidebar } from "@/components/admin/Sidebar";

export const metadata: Metadata = {
  title: "Operação",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-mist">
      <Sidebar />
      <div className="md:pl-[260px]">
        <AdminTopbar />
        <main className="px-4 py-6 md:px-10 md:py-8">{children}</main>
      </div>
    </div>
  );
}
