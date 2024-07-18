import Blog from "@/models/postModel";
import { NextRequest,NextResponse } from "next/server";
import { dbConnect } from "@/dbconfig/dbConnect";

dbConnect();

export async function GET(request: NextRequest) {
    try {
       const blogs = await Blog.find();
       return NextResponse.json({ data: blogs }, { status: 200 });
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}