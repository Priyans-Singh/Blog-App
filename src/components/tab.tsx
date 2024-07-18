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
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all">
        { blogs?.map((blog:any, index) => {
          return(
            <BlogCard key={index} blog={blog} />
          )
        } ) }
      </TabsContent>
      <TabsContent value="active">
      </TabsContent>
    </Tabs>
  );
};

export default Tab;
