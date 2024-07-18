"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function CreateBlog() {
  const router =  useRouter();
  const [pic, setPic] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    thumbnail: "",
  });

  const convertToBase64 = (file: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    const ans = new Promise((resolve, reject) => {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error: any) {
        reject(error);
      };
    });
    return ans;
  };

  const imageChange = async (e: any) => {
    const file = e.target.files[0];
    const image: any = await convertToBase64(file);
    setPic(image);
    setData({ ...data, thumbnail: image });
  };

  const formSubmit = async (e:any) => {
    try {
      const res = await axios.postForm("/api/blog/createBlog", data);
      toast({
        description: res.data.message,
      });
      router.push('/');
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: error.response.data.error,
      });
    }
  };

  return (
    <>
      <Header />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Blog Thumbnail</CardTitle>
              <CardDescription>
                The image that represents your blog.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 relative">
                      {pic ? (
                        // <AspectRatio ratio="16/9" className="w-full h-full">
                        <Image
                          src={pic}
                          alt="Blog Thumbnail"
                          fill
                          style={{objectFit: "cover"}}
                        />
                      ) : (
                        <>
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="thumbnail"
                      name="thumbnail"
                      accept="image/png, image/jpeg, image/jpg"
                      className="hidden"
                      onChange={imageChange}
                    />
                  </label>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>Blog Title</CardTitle>
              <CardDescription>Used to identify your blog.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input
                  placeholder="Blog Title"
                  onChange={(e) => {
                    setData({ ...data, title: e.target.value });
                  }}
                />
              </form>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-04-chunk-3">
            <CardHeader>
              <CardTitle>Blog Description</CardTitle>
              <CardDescription>
                A short description of your blog to show in search results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input
                  placeholder="Blog Description"
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                />
              </form>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-04-chunk-4">
            <CardHeader>
              <CardTitle>Blog Content</CardTitle>
              <CardDescription>The main content of your blog.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Textarea
                  placeholder="Write your blog here"
                  onChange={(e) => {
                    setData({ ...data, content: e.target.value });
                  }}
                />
              </form>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-04-chunk-5">
            <CardHeader>
              <CardTitle>Blog Category</CardTitle>
              <CardDescription>The category of your blog.</CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={(value) => setData({ ...data, category: value })}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a category for your blog" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Blog Category</SelectLabel>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Creative Arts">Creative Arts</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button >Post the Blog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent >
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  <AlertDialogDescription>
                    This action will post this blog on the platform. Are you
                    sure you want to post it?
                  </AlertDialogDescription>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={formSubmit} >Post</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </>
  );
}

export default CreateBlog;
