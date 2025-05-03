// src/app/api/book-meeting/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Meeting from '@/models/meeting.model';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { date, tz, slot, name, email, phone, reason } = await request.json();

    // Validate required fields
    if (!date || !tz || !slot || !name || !email || !phone || !reason) {
      return NextResponse.json(
        { success: false, message: 'Please fill all the fields' },
        { status: 400 }
      );
    }

    // Create and save the meeting
    const newMeeting = await Meeting.create({
      date: new Date(date),
      tz,
      slot,
      name,
      email,
      phone,
      reason,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Meeting booked successfully',
        data: {
          id: newMeeting._id,
          date: newMeeting.date,
          tz: newMeeting.tz,
          slot: newMeeting.slot,
          name: newMeeting.name,
          email: newMeeting.email,
          phone: newMeeting.phone,
          reason: newMeeting.reason,
          createdAt: newMeeting.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error booking meeting:', error);
    return NextResponse.json(
      { success: false, message: 'Error booking meeting' },
      { status: 500 }
    );
  }
}
