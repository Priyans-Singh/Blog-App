"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { File, ListFilter, PlusCircle } from "lucide-react";
import BlogCard from "./contentCard";
import { toast } from "./ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const Tab = () => { 

  const [blogs, setBlogs] = useState([]);
  

  const getBlogs = async () => { 
    try {
      const res = await axios.get('/api/blog/getBlog');
      setBlogs(res.data.data);
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: error.response.data.error,
      });
       }     
    };

    useEffect( () => {
      getBlogs();
    },[])

  return (
    <Tabs defaultValue="All">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Technology">Technology</TabsTrigger>
          <TabsTrigger value="Business">Business</TabsTrigger>
          <TabsTrigger value="Creative Arts">Creative Arts</TabsTrigger>
          <TabsTrigger value="Lifestyle">Lifestyle</TabsTrigger>
          {/* <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger> */}
        </TabsList>
      </div>
      <TabsContent value="All">
        { blogs?.map((blog:any, index) => {
          return(
            <BlogCard key={index} blog={blog} />
          )
        } ) }
      </TabsContent>
      <TabsContent value="Technology">
        {blogs.filter((blog:any) => blog.category === "Technology").map((blog:any, index) => {
          return(
            <BlogCard key={index} blog={blog} />
          )
        })}
      </TabsContent>
      <TabsContent value="Business">
        {blogs.filter((blog:any) => blog.category === "Business").map((blog:any, index) => {
          return(
            <BlogCard key={index} blog={blog} />
          )
        })}
      </TabsContent>
      <TabsContent value="Creative Arts">
        {blogs.filter((blog:any) => blog.category === "Creative Arts").map((blog:any, index) => {
          return(
            <BlogCard key={index} blog={blog} />
          )
        })}
      </TabsContent>
      <TabsContent value="Lifestyle">
        {blogs.filter((blog:any) => blog.category === "Lifestyle").map((blog:any, index) => {
          return(
            <BlogCard key={index} blog={blog} />
          )
        })}
      </TabsContent>
    </Tabs>
  );
};

export default Tab;
