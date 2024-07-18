import { NextRequest,NextResponse } from "next/server";
import { dbConnect } from "@/dbconfig/dbConnect";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json(); 
        const { email, password } = reqBody;
        const user = await User.findOne({email}); 
        if(!user) {
            return NextResponse.json({error: 'Invalid credentials'}, {status: 400});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return NextResponse.json({error: 'Invalid credentials'}, {status: 400});
        }

        const payload = {
            id: user._id
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: '3h'});
        const response = NextResponse.json({
            message: "User logged in successfully",
        })
        
        response.cookies.set('token', token,{
            httpOnly: true,
        });
        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}