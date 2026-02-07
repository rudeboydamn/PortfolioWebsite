import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    // Use real user ID if logged in, otherwise use anonymous user ID (0)
    const userId = session?.user?.id ?? 0;

    const result = await db.toggleLike(userId, parseInt(id));

    return NextResponse.json({
      message: result.liked ? 'Thought liked' : 'Like removed',
      liked: result.liked,
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}
