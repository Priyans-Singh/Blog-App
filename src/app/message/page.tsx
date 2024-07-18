import { cookies } from "next/headers";
import { ChatLayout } from "@/components/chat/chat-layout";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <main className="flex bg-green-500 flex-col items-center justify-center p-4 md:px-24 py-16 gap-4">
      <div className="z-10 border bg-red-500 rounded-lg  w-full h-full text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    </main>
  );
}