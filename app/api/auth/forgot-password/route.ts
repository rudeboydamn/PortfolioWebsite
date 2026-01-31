import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await db.getUserByEmail(email);

    if (!user) {
      // Don't reveal if email exists for security
      return NextResponse.json({
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    await db.createPasswordResetToken(user.id, token);

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/thoughts?reset=${token}`;

    // Send email
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: email,
      subject: 'Password Reset - Dammy Henry Thoughts',
      html: `
        <h2>Password Reset Request</h2>
        <p>Hi ${user.name},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <p><a href="${resetUrl}" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <br>
        <p>Best,<br>Dammy Henry</p>
      `,
    });

    return NextResponse.json({
      message: 'If an account with that email exists, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
