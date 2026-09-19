import { z } from 'zod';

// User schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username must be at most 30 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export const updateProfileSchema = z.object({
  display_name: z.string().min(1, 'Display name is required').max(50, 'Display name must be at most 50 characters').optional(),
  area: z.string().optional(),
});

// Gift Exchange schemas
export const createGiftExchangeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be at most 100 characters'),
  description: z.string().max(500, 'Description must be at most 500 characters').optional(),
  event_date: z.string().datetime('Invalid date format').refine((date) => new Date(date) > new Date(), 'Event date must be in the future'),
});

export const updateGiftExchangeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be at most 100 characters').optional(),
  description: z.string().max(500, 'Description must be at most 500 characters').optional(),
  event_date: z.string().datetime('Invalid date format').optional(),
  status: z.enum(['draft', 'active', 'completed', 'archived']).optional(),
});

// Draw schemas
export const executeDrawSchema = z.object({
  min_participants: z.number().min(2, 'Minimum 2 participants required').optional(),
});

// Wishlist schemas
export const addWishlistItemSchema = z.object({
  item_name: z.string().min(1, 'Item name is required').max(200, 'Item name must be at most 200 characters'),
  description: z.string().max(1000, 'Description must be at most 1000 characters').optional(),
  priority: z.number().int().min(1).max(5).optional(),
  link: z.string().url('Invalid URL format').optional(),
});

export const updateWishlistItemSchema = z.object({
  item_name: z.string().min(1, 'Item name is required').max(200, 'Item name must be at most 200 characters').optional(),
  description: z.string().max(1000, 'Description must be at most 1000 characters').optional(),
  priority: z.number().int().min(1).max(5).optional(),
  link: z.string().url('Invalid URL format').optional(),
});

// Types derived from schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateGiftExchangeInput = z.infer<typeof createGiftExchangeSchema>;
export type UpdateGiftExchangeInput = z.infer<typeof updateGiftExchangeSchema>;
export type ExecuteDrawInput = z.infer<typeof executeDrawSchema>;
export type AddWishlistItemInput = z.infer<typeof addWishlistItemSchema>;
export type UpdateWishlistItemInput = z.infer<typeof updateWishlistItemSchema>;
