import Image from "next/image";
import React from "react";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const BlogCard = ({blog}:any) => {
  return (
    <Card  >
      <CardHeader className=" relative">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          width={500}
          height={350}
          style={{objectFit: "cover"}}
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{blog.title}</CardTitle>
        <CardDescription>{blog.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button >Read More</Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
