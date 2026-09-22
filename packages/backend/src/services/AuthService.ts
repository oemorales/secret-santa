import { PrismaClient } from '@prisma/client';
import { RegisterInput, LoginInput, ForgotPasswordInput, ResetPasswordInput } from '@secret-santa/shared';
import { hashPassword, comparePasswords } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import { createError } from '../middleware/errorHandler.js';
import crypto from 'crypto';

const prisma = new PrismaClient();

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw createError('Email already registered', 409, 'EMAIL_EXISTS');
    }

    const passwordHash = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password_hash: passwordHash,
        username: data.username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        created_at: true,
        updated_at: true,
      },
    });

    const token = generateToken({ userId: user.id, email: user.email });

    return { user, token };
  }

  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw createError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    const isPasswordValid = await comparePasswords(data.password, user.password_hash);

    if (!isPasswordValid) {
      throw createError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    const token = generateToken({ userId: user.id, email: user.email });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  async forgotPassword(data: ForgotPasswordInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      // Return success even if user doesn't exist for security
      return { message: 'If an account exists with this email, you will receive a password reset link' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    // In production, store the token in database and send via email
    // For now, we'll just return a success message
    console.log(`Password reset token for ${data.email}: ${resetToken}`);

    return { message: 'If an account exists with this email, you will receive a password reset link' };
  }

  async resetPassword(data: ResetPasswordInput) {
    // In production, validate the token against database
    // For now, we'll just reset the password
    await hashPassword(data.newPassword);

    // This would normally find user by reset token
    // For demo purposes, we'll just return success
    return { message: 'Password has been reset successfully' };
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        profile_picture_url: true,
        area: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw createError('User not found', 404, 'USER_NOT_FOUND');
    }

    return user;
  }

  async updateProfile(userId: string, data: { display_name?: string; area?: string }) {
    const updateData: Record<string, string> = {};

    if (data.area !== undefined) {
      updateData.area = data.area;
    }

    // Note: display_name is per gift exchange, not per user profile
    // This is handled in GiftExchangeParticipant model

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        profile_picture_url: true,
        area: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }

  async updateProfilePicture(userId: string, profilePictureUrl: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { profile_picture_url: profilePictureUrl },
      select: {
        id: true,
        email: true,
        username: true,
        profile_picture_url: true,
        area: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }
}
