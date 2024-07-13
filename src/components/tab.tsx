import React from "react";
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
import Card from "./contentCard";

const Tab = () => {
  // <TabsContent value="all">
  //         <Card/>
  //         </TabsContent>

  // const data = {1,2,3,4,5,6}

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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </TabsContent>
      <TabsContent value="active">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </TabsContent>
    </Tabs>
  );
};

export default Tab;
