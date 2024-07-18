import { NextRequest,NextResponse } from "next/server";
import { dbConnect } from "@/dbconfig/dbConnect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

dbConnect();

export  async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { firstName, lastName, email, password } = reqBody;
        const user  = await User.findOne({email});
        if(user) {
            return NextResponse.json({error: 'User already exists'}, {status: 400});
        }
        const name  = `${firstName} ${lastName}`;
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return NextResponse.json({message:"User created successfully"}, {status: 201});

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}