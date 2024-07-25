import Sidebar from "@/components/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">{children}</div>
    </div>
  );
}
