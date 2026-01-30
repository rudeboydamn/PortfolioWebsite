import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    const userId = session?.user?.id;

    const thought = await db.getThoughtById(parseInt(id), userId);

    if (!thought) {
      return NextResponse.json(
        { error: 'Thought not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ thought });
  } catch (error) {
    console.error('Error fetching thought:', error);
    return NextResponse.json(
      { error: 'Failed to fetch thought' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const thought = await db.updateThought(
      parseInt(id),
      session.user.id,
      title,
      content
    );

    if (!thought) {
      return NextResponse.json(
        { error: 'Thought not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Thought updated successfully', thought });
  } catch (error) {
    console.error('Error updating thought:', error);
    return NextResponse.json(
      { error: 'Failed to update thought' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const isAdmin = session.user.email === 'dammy@dammyhenry.com';
    const success = await db.deleteThought(parseInt(id), session.user.id, isAdmin);

    if (!success) {
      return NextResponse.json(
        { error: 'Thought not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    console.error('Error deleting thought:', error);
    return NextResponse.json(
      { error: 'Failed to delete thought' },
      { status: 500 }
    );
  }
}
