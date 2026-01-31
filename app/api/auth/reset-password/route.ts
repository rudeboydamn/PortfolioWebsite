import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Verify token
    const resetData = await db.verifyPasswordResetToken(token);

    if (!resetData) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.updateUserPassword(resetData.userId, hashedPassword);

    // Delete the used token
    await db.deletePasswordResetToken(token);

    return NextResponse.json({
      message: 'Password reset successfully. You can now login with your new password.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
