// src/app/api/meeting/list/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import dbConnect from '@/lib/dbConnect';
import Meeting from '@/models/meeting.model';

export async function GET() {
  await dbConnect();

  // Authenticate user session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized: No session found' },
      { status: 401 }
    );
  }

  // Only allow admins
  if (!session.user.isAdmin) {
    return NextResponse.json(
      { success: false, message: 'Forbidden: Admins only' },
      { status: 403 }
    );
  }

  try {
    // Fetch all meetings in descending creation order
    const meetings = await Meeting.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: 'Meetings fetched successfully',
        data: meetings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
