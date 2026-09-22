import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/auth.js';
import { uploadProfilePicture } from '../middleware/upload.js';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, updateProfileSchema } from '@secret-santa/shared';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', validate(registerSchema), authController.register.bind(authController));
router.post('/login', validate(loginSchema), authController.login.bind(authController));
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword.bind(authController));
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword.bind(authController));

// Protected routes
router.get('/me', authenticate, authController.getProfile.bind(authController));
router.put('/me', authenticate, validate(updateProfileSchema), authController.updateProfile.bind(authController));
router.post('/me/profile-picture', authenticate, uploadProfilePicture.single('profilePicture'), authController.updateProfilePicture.bind(authController));

export default router;
