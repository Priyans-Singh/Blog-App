'use client';
import { useState,useEffect } from "react";
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
import axios from 'axios';
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";


export default function Signup() {
  
  const router = useRouter();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (user.firstName && user.lastName && user.email && user.password) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  const submitHandler = async (e:any) => {
     try {
         e.preventDefault();
         const response = await axios.post('/api/users/signup', user);
        //  console.log(response.data);
         toast({
          description: response.data.message,
        });
        router.push('/login');
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
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login_pic.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" onChange={(e)=>{ setUser({...user, firstName:e.target.value}) }} value={user.firstName} placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" onChange={(e)=>{ setUser( {...user, lastName:e.target.value} ) }} value={user.lastName} placeholder="Robinson" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e)=>{ setUser( {...user, email:e.target.value} ) }}
                  value={user.email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" onChange={(e)=>{ setUser( {...user, password:e.target.value} ) }} value={user.password} type="password" />
              </div>
              <Button type="submit" className="w-full" disabled = {disable} onClick={submitHandler}>
                Create an account
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
