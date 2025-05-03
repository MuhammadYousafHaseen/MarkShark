import dbConnect from '@/lib/dbConnect';
import Message from '@/models/message.model';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();

    const { messageId } = await request.json();
    if (!messageId) {
        return NextResponse.json(
            { success: false, message: 'Unauthorized: No message found' },
            { status: 401 }
          );
    }
    try {

        // Check if the message exists
        const message = await Message.findById(messageId);
        if (!message) {
            return NextResponse.json(
                { success: false, message: 'message not found' },
                { status: 404 }
            );
        }

        // Delete the message
        await Message.findByIdAndDelete(messageId);

        return NextResponse.json(
            { success: true, message: 'message deleted successfully' },
            { status: 200 }
        );
        
    } catch (error) {
        console.error('Error deleting message:', error);
         return NextResponse.json(
              { success: false, message: 'Internal Server Error' },
              { status: 500 }
         );
    }
}