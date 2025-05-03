import dbConnect from '@/lib/dbConnect';
import User from '@/models/user.model';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();

    const { userId } = await request.json();
    if (!userId) {
        return NextResponse.json(
            { success: false, message: 'Unauthorized: No User found' },
            { status: 401 }
          );
    }
    try {

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Delete the user
        await User.findByIdAndDelete(userId);

        return NextResponse.json(
            { success: true, message: 'User deleted successfully' },
            { status: 200 }
        );
        
    } catch (error) {
        console.error('Error deleting user:', error);
         return NextResponse.json(
              { success: false, message: 'Internal Server Error' },
              { status: 500 }
         );
    }
}