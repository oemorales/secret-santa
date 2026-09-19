# Implementation Plan - Secret Santa Application

## Project Overview
A web application for managing "Secret Santa"-like gift exchange activities among users. The platform handles user management, gift exchange creation, draw execution, and wishlist management with role-based access control.

## Core Concepts

### User Roles
- **Participant:** Standard user who can join gift exchanges
- **Organizer:** Can create and manage gift exchanges
- **Admin:** System administrator (optional, for future expansion)

### Gift Exchange Lifecycle
1. **Creation:** Organizer creates gift exchange with rules
2. **Joining:** Users join based on area rules
3. **Draw:** Organizer executes draw when minimum participants met
4. **Wishlist:** Users add items to their wishlist
5. **Event:** Gift exchange event occurs
6. **Reveal:** All relationships become visible

## Data Model

### Users
- `id` (UUID)
- `email` (unique)
- `password_hash`
- `username`
- `profile_picture_url`
- `area` (region/location)
- `created_at`
- `updated_at`

### Gift Exchanges
- `id` (UUID)
- `organizer_id` (FK to Users)
- `name`
- `description`
- `event_date`
- `status` (draft, active, completed, archived)
- `created_at`
- `updated_at`

### Gift Exchange Participants
- `id` (UUID)
- `gift_exchange_id` (FK)
- `user_id` (FK)
- `display_name` (custom for this exchange)
- `joined_at`

### Draw Rules
- `id` (UUID)
- `gift_exchange_id` (FK)
- `allow_multiple_groups` (boolean)
- `exclude_same_area` (boolean)
- `exclude_same_subgroup` (boolean)
- `created_at`

### Draw Exclusions
- `id` (UUID)
- `draw_rule_id` (FK)
- `excluded_user_id_1` (FK to Users, nullable) - First user in the exclusion pair
- `excluded_user_id_2` (FK to Users, nullable) - Second user in the exclusion pair
- `excluded_subgroup_1` (string, nullable) - First subgroup in the exclusion pair
- `excluded_subgroup_2` (string, nullable) - Second subgroup in the exclusion pair
- `description` (string, optional) - Human-readable description of the exclusion rule

### Draw Results
- `id` (UUID)
- `gift_exchange_id` (FK)
- `sender_id` (FK to Users)
- `receiver_id` (FK to Users)
- `drawn_at`
- `visible_after` (timestamp)

### Wishlists
- `id` (UUID)
- `gift_exchange_id` (FK)
- `user_id` (FK)
- `item_name`
- `description`
- `priority` (optional)
- `link` (optional)
- `created_at`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

**Validation (Zod):**
- `register`: email (valid format), password (min 8 chars), username (3-30 chars)
- `login`: email (valid format), password (required)
- `reset-password`: token (required string), newPassword (min 8 chars)

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `POST /api/users/me/profile-picture` - Upload profile picture

**Validation (Zod):**
- `updateProfile`: display_name (1-50 chars, optional), area (string from allowed regions, optional)
- `profilePicture`: file (image/jpeg or image/png, max 5MB)

### Gift Exchanges
- `POST /api/gift-exchanges` - Create gift exchange (organizer)
- `GET /api/gift-exchanges` - List available gift exchanges
- `GET /api/gift-exchanges/:id` - Get gift exchange details
- `PUT /api/gift-exchanges/:id` - Update gift exchange (organizer)
- `POST /api/gift-exchanges/:id/join` - Join gift exchange
- `POST /api/gift-exchanges/:id/leave` - Leave gift exchange
- `GET /api/gift-exchanges/:id/participants` - List participants

**Validation (Zod):**
- `create`: name (required, 1-100 chars), description (optional, max 500 chars), event_date (ISO date, must be future)
- `update`: name (optional, 1-100 chars), description (optional, max 500 chars), event_date (optional, ISO date future), status (enum: draft, active, completed, archived)
- `join`: (no body — user derived from JWT)
- Organiser role checked via middleware before create/update/draw

### Draw
- `POST /api/gift-exchanges/:id/draw` - Execute draw (organizer)
- `GET /api/gift-exchanges/:id/draw-result` - Get draw result (if visible)
- `GET /api/gift-exchanges/:id/my-receiver` - Get assigned receiver

**Validation (Zod):**
- `executeDraw`: min 2 participants verified at service level; exclusion pairs validated against existing user/subgroup IDs
- Visibility: draw_result only returned if `visible_after` ≤ now or user is organizer

### Wishlist
- `GET /api/gift-exchanges/:id/wishlist` - Get wishlist (for assigned gifter)
- `POST /api/gift-exchanges/:id/wishlist` - Add wishlist item
- `PUT /api/wishlist/:id` - Update wishlist item
- `DELETE /api/wishlist/:id` - Delete wishlist item

**Validation (Zod):**
- `addItem`: item_name (1-200 chars), description (optional, max 1000 chars), priority (optional, integer 1-5), link (optional, valid URL)
- `updateItem`: item_name (optional, 1-200 chars), description (optional, max 1000 chars), priority (optional, integer 1-5), link (optional, valid URL)
- Access: wishlist readable only by assigned gifter and the wishlist owner

## Technical Implementation

### Frontend Components
- **Pages:** Login, Register, Dashboard, Gift Exchange, Profile
- **Components:** GiftExchangeCard, ParticipantList, WishlistForm, DrawButton
- **Context:** AuthContext, GiftExchangeContext

### Backend Services
- **AuthService:** Handles authentication logic
- **UserService:** User management operations
- **GiftExchangeService:** Gift exchange CRUD operations
- **DrawService:** Draw algorithm and execution
- **WishlistService:** Wishlist management

### Input Validation
- Zod schemas defined per route in `middleware/validate.ts`
- Express middleware rejects invalid requests before reaching service layer
- Frontend uses same Zod schemas for form validation (shared types between frontend/backend)

### Draw Algorithm
1. Validate minimum participants (2+)
2. Apply exclusion rules (pairs of users/subgroups that cannot be paired)
3. Generate valid sender-receiver pairs
4. Ensure single round trip if required
5. Store results with visibility timestamp

### Security Measures
- Password hashing with bcrypt
- JWT token authentication
- Input validation on all endpoints
- Rate limiting for API calls
- CORS configuration

## Development Workflow

### Local Development
1. Clone the repository
2. Run `docker-compose up` for database
3. Run `npm install` at root to install all dependencies
4. Run `npm run migrate` to run database migrations
5. Run `npm run dev` to start both frontend and backend servers

### Testing Strategy

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Vitest | Services, utilities, draw algorithm |
| API Integration | Vitest + Supertest | All REST endpoints |
| Component | React Testing Library | UI components in isolation |
| E2E | Cypress | Critical-path flows only (auth, participation, draw, wishlist) |

- Tests are written incrementally per milestone (see `roadmap.md`)
- CI runs unit + integration on every push; E2E on PR to main

### Deployment Process
1. CI/CD pipeline runs full test suite (unit + integration + E2E)
2. Build all packages for production
3. Build Docker images for frontend and backend
4. Run database migrations
5. Deploy with Docker Compose
6. Configure Nginx reverse proxy

## Future Enhancements (Post-MVP)
- Email notifications for draw results
- Real-time updates with WebSockets
- Multiple language support
- Mobile app (React Native)
- Integration with calendar apps
- Gift tracking and confirmation
- Rating system for gifts