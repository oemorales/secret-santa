# Secret Santa - Gift Exchange Application

## Project Overview
A web application for managing "Secret Santa"-like gift exchange activities among users. The platform handles user management, gift exchange creation, draw execution, and wishlist management with role-based access control.

## Core Features

### User Management
- User registration and authentication (email/password)
- Profile management with display names per gift exchange
- Profile picture upload
- Area/region-based organization
- Role-based access (Participant, Organizer)

### Gift Exchange Management
- Create and manage multiple gift exchanges
- Area-based join rules and restrictions
- Configurable draw rules and exclusions
- Event date tracking and status management

### Draw System
- Minimum 2 participants required
- Single round trip or multiple groups options
- User pair exclusion rules (two users cannot be paired)
- Subgroup pair exclusion rules (two subgroups cannot be paired)
- Scheduled visibility of results

### Wishlist System
- Add items to personal wishlist per gift exchange
- Priority and description for items
- Visibility only to assigned gifter

## Technical Architecture

### Frontend
- React 19+ with TypeScript
- Vite build tool
- Tailwind CSS styling
- React Router for navigation

### Backend
- Node.js 26.9.0+ with Express.js
- TypeScript
- JWT authentication
- Prisma ORM

### Database
- PostgreSQL 16+
- Dockerized for development

## Project Structure
```
secret-santa/
├── packages/
│   ├── frontend/      # React application
│   ├── backend/       # Express.js API
│   └── shared/        # Shared types, schemas, and constants
├── specs/             # Project specifications
│   ├── tech-stack.md  # Technology decisions
│   ├── roadmap.md     # Development milestones
│   └── plan.md        # Implementation details
├── docker-compose.yml # Development environment
├── package.json       # Root package.json (workspace configuration)
└── tsconfig.json      # Root TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js 26.9.0+
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### Development Setup
1. Clone the repository: `git clone https://github.com/oemorales/secret-santa`
2. Navigate to project: `cd secret-santa`
3. Run `docker-compose up -d` to start database
4. Install dependencies: `npm install`
5. Run migrations: `npm run migrate`
6. Start development servers: `npm run dev`

## Development Roadmap
See [specs/roadmap.md](specs/roadmap.md) for detailed development milestones.

## Technical Specifications
See [specs/tech-stack.md](specs/tech-stack.md) for technology decisions and architecture.

## Implementation Plan
See [specs/plan.md](specs/plan.md) for detailed implementation details and API specifications.

## License
[Add your license here]