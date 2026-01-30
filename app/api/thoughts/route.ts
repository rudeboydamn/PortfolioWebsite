import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const thoughts = await db.getThoughts(userId);

    return NextResponse.json({ thoughts });
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch thoughts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const thought = await db.createThought(session.user.id, title, content);

    return NextResponse.json(
      { message: 'Thought created successfully', thought },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating thought:', error);
    return NextResponse.json(
      { error: 'Failed to create thought' },
      { status: 500 }
    );
  }
}
