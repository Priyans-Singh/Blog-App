"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


export default function InputForm() {
  const router = useRouter();
  const [pic, setPic] = useState(null);
  const [data, setData] = useState({
    profilePic: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const formSubmission = async () => {

    try {
      const response = await axios.putForm("/api/users/userData", data);
      toast({
        description: response.data.message,
      });
      router.push("/");
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: error.response.data.error,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    formSubmission();
  };

  function convertToBase64(file: any) {
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
  }

  const handleChange = async (e:any) => {
    const file = e.target.files[0];
    const image: any = await convertToBase64(file);
    // console.log(typeof image);
    setPic(image);
    setData({ ...data, profilePic: image });
  };

  return (
    //  <input type="file" onChange={handleChange} />
    <form className=" flex flex-col gap-10 items-start" >
      <label
        htmlFor="profilePic"
        className="flex flex-col items-center justify-center w-32 h-32 bg-primary/10 rounded-full cursor-pointer"
      >
        {pic ? (
          <Image
            src={pic}
            alt="profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <Image
            src="/profile.svg"
            alt="profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        )}
      </label>
      <input
        type="file"
        id="profilePic"
        name="profilePic"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={handleChange}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        onChange={(e) => {
          setData({ ...data, firstName: e.target.value });
        }}
        name="firstName"
        placeholder="First Name"
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        onChange={(e) => {
          setData({ ...data, lastName: e.target.value });
        }}
        name="lastName"
        placeholder="Last Name"
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
        }}
        name="email"
        placeholder="Email"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
}
