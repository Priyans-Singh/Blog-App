import { NextResponse,NextRequest } from "next/server";
import { dbConnect } from "@/dbconfig/dbConnect";

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({message: "User logged out successfully"}, {status: 200});
        response.cookies.set('token', '', {expires: new Date(0)});
        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}