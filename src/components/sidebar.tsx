"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Package2,
  NotebookPenIcon,
  MessageCircleMore,
  Settings,
  PlusCircle,
  User2
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Image from "next/image";

const Sidebar = () => {
   
  const [page, setPage] = useState(null);
  console.log(page);

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          {/* <NotebookPenIcon className="h-6 w-6 transition-all group-hover:scale-110" /> */}
          <Image src='/Bloggers-logo.svg' height={200} width={200} alt="Bloggers-logo" className="scale-150" />
          <span className="sr-only">Bloggers</span>
        </Link>
        <TooltipProvider>
          <Tooltip >
            <TooltipTrigger asChild>
              <Link
                href="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-white hover:bg-blue-800 md:h-8 md:w-8"
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Home</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/blog/createBlog"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-white hover:bg-blue-800 md:h-8 md:w-8"
              >
                <PlusCircle className="h-5 w-5" />
                <span className="sr-only">New Blog</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">New Blog</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/profileEdit"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-white hover:bg-blue-800 md:h-8 md:w-8"
              >
                <User2 className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Profile</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/message"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-white hover:bg-blue-800 md:h-8 md:w-8"
              >
                <MessageCircleMore className="h-5 w-5" />
                <span className="sr-only">Message</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Message</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-white hover:bg-blue-800 md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
