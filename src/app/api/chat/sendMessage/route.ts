import { NextRequest, NextResponse } from "next/server";
import Message from "@/models/messageModel";
import Conversation from "@/models/conversationModel";
import User from "@/models/userModel";
import jwt from 'jsonwebtoken';
import { dbConnect } from "@/dbconfig/dbConnect";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        const data: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById({ _id: data.id }).select('-password');
        if (!user) {
            return NextResponse.json({ error: "Unauthorized user cannot create blog" }, { status: 404 });
        }

        const { recieverId, message } = await request.json();
        const reciever = await User.findById({ _id: recieverId }).select('-password');

        let consversation = await Conversation.findOne(
            { participants: { $all: [data.id, recieverId] } }
        );

        if (!consversation) {
            consversation = await Conversation.create({
                participants: [data.id, recieverId]
            });
        }

        const newMessage = new Message({
            senderId: data.id,
            recieverId,
            message,
       });

       await newMessage.save();
       consversation.messages.push(newMessage._id);
       await consversation.save();

       return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};