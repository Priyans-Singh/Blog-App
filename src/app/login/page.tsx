'use client'

import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import axios from 'axios';


export default function Login() {

  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (user.email && user.password) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  const submitHandler = async (e:any) => {
    try {
        e.preventDefault();
        const response = await axios.post('/api/users/login', user);
        // console.log(response.data);
        toast({
         description: response.data.message,
       });
       router.push('/');
    } catch (error:any) {
     // console.log(error.response.data.error);
     toast({
       variant: "destructive",
       title: error.response.data.error,
     });
    }
 };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e)=>{ setUser( {...user, email:e.target.value} ) }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" onChange={(e)=>{ setUser( {...user, password:e.target.value} ) }} required />
              </div>
              <Button type="submit" className="w-full" disabled={disable} onClick={submitHandler}>
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login_pic.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
