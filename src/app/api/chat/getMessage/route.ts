import { NextRequest, NextResponse } from "next/server";
import Message from "@/models/messageModel";
import Conversation from "@/models/conversationModel";
import User from "@/models/userModel";
import jwt from 'jsonwebtoken';
import { dbConnect } from "@/dbconfig/dbConnect";

dbConnect();

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        const data: any = jwt.verify(token, process.env.JWT_SECRET!);
        const { recieverId } = await request.json();
        const conversation = await Conversation.findOne({
            participants: { $all: [data.id, recieverId] }
        }).populate('messages');

        return NextResponse.json({ conversation }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};