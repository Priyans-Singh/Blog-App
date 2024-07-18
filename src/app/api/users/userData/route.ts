import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/UserModel";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        const data:any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById({ _id: data.id }).select('-password');
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        
        return NextResponse.json({
            data:user
        }, {status: 200});

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        const data:any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById({ _id: data.id }).select('-password');
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        const reqBody = await request.formData(); 
        const profilePic = reqBody.get('profilePic');
        const firstName = reqBody.get('firstName');
        const lastName = reqBody.get('lastName');   
        const email = reqBody.get('email');
        if(profilePic){
            user.profilePic = profilePic;
        }
        if(firstName && lastName){
            user.name = `${firstName} ${lastName}`;
        }
        if(email){
            user.email = email;
        }
        await user.save();
        return NextResponse.json({
            message: "User updated successfully",
        }, {status: 200});
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}