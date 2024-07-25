import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Blogers",
  description:
    "An app where blogers can create, make friends and send blogs to each other",
};

export default function AuthLayout({
  children
}: {
   children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">{children}</div>
  );
}
