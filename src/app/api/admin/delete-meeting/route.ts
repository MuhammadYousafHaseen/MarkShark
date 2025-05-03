import dbConnect from '@/lib/dbConnect';
import Meeting from '@/models/meeting.model';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();

    const { meetingId } = await request.json();
    if (!meetingId) {
        return NextResponse.json(
            { success: false, message: 'Unauthorized: No meeting found' },
            { status: 401 }
          );
    }
    try {

        // Check if the meeting exists
        const meeting = await Meeting.findById(meetingId);
        if (!meeting) {
            return NextResponse.json(
                { success: false, message: 'meeting not found' },
                { status: 404 }
            );
        }

        // Delete the meeting
        await Meeting.findByIdAndDelete(meetingId);

        return NextResponse.json(
            { success: true, message: 'meeting deleted successfully' },
            { status: 200 }
        );
        
    } catch (error) {
        console.error('Error deleting meeting:', error);
         return NextResponse.json(
              { success: false, message: 'Internal Server Error' },
              { status: 500 }
         );
    }
}