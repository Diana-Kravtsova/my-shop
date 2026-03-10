import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { CategorySidebar } from "@/components/CategorySidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getAllCategories } from "@/lib/api";

export const metadata: Metadata = {
  title: "Modern E-commerce Store",
  description: "A premium shopping experience for high-quality products.",
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const categories = await getAllCategories();

  return (
    <html lang="en" className={"dark"}>
      <body className={"flex min-h-screen flex-col antialiased"}>
        <TooltipProvider>
          <SidebarProvider defaultOpen={false}>
            <CategorySidebar categories={categories} />
            <SidebarInset className="flex flex-col">
              <Header />
              <main className="flex-1 px-4 py-8">
                <div className="container mx-auto">{children}</div>
              </main>
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
};

export default RootLayout;
