"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  Package2,
  PanelLeft,
  Search,
  MessageCircleMore,
  Settings,
  PlusCircle,
  User2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Input } from "./ui/input";
import Image from "next/image";
import { ModeToggle } from "./modeToggle";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<{ profilePic?: string , name?:string } | null>(
    null
  );
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("/api/users/userData");
      setUserData(response.data.data);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("/api/users/logout");
      setLoggedIn(false);
      setUserData(null);
      toast({
        description: response.data.message,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.response.data.error,
      });
    }
  };

  const login = () => {
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Image
                src="/Bloggers-logo.svg"
                height={200}
                width={200}
                alt="Bloggers-logo"
                className="scale-150"
              />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              href="/blog/createBlog"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <PlusCircle className="h-5 w-5" />
              New Blog
            </Link>
            <Link
              href="/profileEdit"
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <User2 className="h-5 w-5" />
              Profile
            </Link>
            <Link
              href="/message"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <MessageCircleMore className="h-5 w-5" />
              Message
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      {/* <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Orders</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Recent Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={
                userData
                  ? userData.profilePic
                    ? userData.profilePic
                    : "profile.svg"
                  : "profile.svg"
              }
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {userData?.name || "My account"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          {loggedIn ? (
            <DropdownMenuItem className=" cursor-pointer" onClick={logout}>
              Logout
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className=" cursor-pointer" onClick={login}>
              Log In
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ModeToggle />
    </header>
  );
};

export default Header;
