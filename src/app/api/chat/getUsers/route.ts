import { NextRequest, NextResponse } from "next/server";
import Message from "@/models/messageModel";
import Conversation from "@/models/conversationModel";
import User from "@/models/UserModel";
import jwt from 'jsonwebtoken';
import { dbConnect } from "@/dbconfig/dbConnect";

dbConnect();

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        const data: any = jwt.verify(token, process.env.JWT_SECRET!);
        const users = await User.find({ _id: { $ne: data.id } });
        if (!users) {
            return NextResponse.json({ error: 'No users found' }, { status: 404 });
        } 
        return NextResponse.json({ users }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};