import Blog from '@/models/postModel';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/dbconfig/dbConnect';

dbConnect();

export async function POST(request: NextRequest) {
    try {
        //Destructuring the data from the form
        const reqBody = await request.formData();

        const title = reqBody.get("title");
        const content = reqBody.get("content");
        const thumbnail = reqBody.get("thumbnail");
        const description = reqBody.get("description");
        const category = reqBody.get("category");
        
        //Checking if the user is authorized to create a blog
        const token = request.cookies.get('token')?.value || '';
        const data:any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById({ _id: data.id }).select('-password');
        if (!user) {
            return NextResponse.json({error: "Unauthorized user cannot create blog"}, {status: 404});
        }

        //Creating a new blog post
        const blog = new Blog({
            title,
            content,
            thumbnail,
            description,
            category,
            authorId: user._id,
            authorName: user.name
        });

        await blog.save();
        
        user.posts.push(blog._id);
        await user.save();

        return NextResponse.json({ message: "Blog posted successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}