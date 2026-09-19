# Roadmap - Secret Santa Application

## Milestone 1: Project Foundation
- Set up monorepo structure with npm workspaces
- Initialize packages/frontend and packages/backend directories
- Configure shared TypeScript, ESLint, Prettier at root level
- Set up Docker Compose for local development
- Create basic database schema with Prisma

## Milestone 2: User Authentication System
- Implement user registration with email/password
- Implement user login/logout
- Set up JWT authentication middleware
- Create password reset functionality
- Add profile picture upload capability
- **Testing:** Unit tests for AuthService; integration tests for `/auth/*` endpoints; E2E: register→login→protected route
- **Validation:** Zod schemas for email format, password ≥8 chars, JWT expiry; reject duplicate email on registration

## Milestone 3: User Profile Management
- Create user profile page
- Implement area/region selection
- Add display name customization per gift exchange
- Store user preferences and settings
- **Testing:** Unit tests for UserService; integration tests for `/users/*` endpoints
- **Validation:** Validate display name 1-50 chars, area from allowed list of regions

## Milestone 4: Gift Exchange Creation
- Create organizer role system
- Implement gift exchange creation form
- Add area-based join rules configuration
- Set up basic gift exchange management
- **Testing:** Integration tests for gift exchange CRUD endpoints
- **Validation:** Validate required fields (name, event_date), event_date is future, organizer role check on create/update

## Milestone 5: Gift Exchange Participation
- Implement gift exchange discovery/joining
- Add join request approval system
- Create participant list management
- Implement area-based access control
- **Testing:** Integration tests for join/leave/approval flows; E2E: discover→join→approval→participant list
- **Validation:** Validate user not already joined, area-based join rules enforced, approval only by organizer

## Milestone 6: Draw System Core
- Implement draw algorithm with constraints
- Add single round trip vs multiple groups option
- Create user pair exclusion rules
- Add subgroup pair exclusion rules
- Implement subgroup configuration
- **Testing:** Unit tests for draw algorithm (all constraint combos); property-based tests for edge cases
- **Validation:** Validate min 2 participants, exclusion pairs reference valid user/subgroup IDs, subgroups exist before draw

## Milestone 7: Draw Execution & Visibility
- Create draw execution interface
- Implement draw result visibility rules
- Add "reveal date" functionality
- Create sender-receiver relationship display
- **Testing:** Integration tests for draw endpoint; E2E: execute draw→view result→reveal date
- **Validation:** Validate draw not re-executed, visibility timestamp not in past, only organizer can execute draw

## Milestone 8: Wishlist System
- Implement wishlist item creation
- Add item editing and deletion
- Create wishlist visibility for assigned gifter
- Add item priority or preference levels
- **Testing:** Unit tests for WishlistService; integration tests for `/wishlist/*` endpoints; E2E: gifter views receiver's wishlist
- **Validation:** Validate item name 1-200 chars, priority 1-5 optional integer, only gifter can view assigned receiver's wishlist

## Milestone 9: Gift Exchange Lifecycle
- Implement event date tracking
- Add gift exchange status management (active, completed, archived)
- Create post-event relationship reveal
- Add gift exchange history
- **Testing:** Integration tests for status transitions
- **Validation:** Validate status state machine (draft→active→completed→archived), event_date constraints on transitions

## Milestone 10: Admin Dashboard
- Create organizer dashboard
- Add participant management
- Implement gift exchange statistics
- Add bulk operations for organizers
- **Testing:** Integration tests for bulk operations
- **Validation:** Validate admin/organizer permissions, bulk operation limits (max participants per batch)

## Milestone 11: Polish & Optimization
- UI/UX improvements
- Performance optimization
- Mobile responsiveness
- Error handling improvements
- **Testing:** Performance tests for critical paths; accessibility audit (WCAG 2.1 AA)
- **Validation:** Validate consistent error responses across all endpoints, rate limiting enforced

## Milestone 12: Deployment & CI/CD
- Set up CI/CD pipeline (GitHub Actions)
- Run full regression test suite
- Configure production environment
- Deploy to self-hosted infrastructure