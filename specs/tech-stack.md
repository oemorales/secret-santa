# Tech Stack - Secret Santa Application

## Overview
This document outlines the technology stack for the Secret Santa web application, a platform for managing gift exchange activities among users.

## Frontend
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API + useReducer
- **Routing:** React Router v6
- **Form Handling:** React Hook Form
- **HTTP Client:** Axios

## Backend
- **Runtime:** Node.js 20+ LTS
- **Framework:** Express.js
- **Language:** TypeScript
- **Authentication:** JWT (JSON Web Tokens) with bcrypt for password hashing
- **Validation:** Zod (schema validation with TypeScript inference)
- **File Upload:** Multer (for profile pictures)

## Database
- **Primary Database:** PostgreSQL 16+
- **ORM:** Prisma
- **Migrations:** Prisma Migrate

## DevOps & Deployment
- **Containerization:** Docker + Docker Compose
- **Reverse Proxy:** Nginx
- **Process Management:** PM2 (for Node.js)
- **Version Control:** Git

## Development Tools
- **Package Manager:** npm or yarn
- **Code Linting:** ESLint
- **Code Formatting:** Prettier
- **Testing:** Vitest (unit/integration), Supertest (API testing), React Testing Library (components), Cypress (E2E critical paths)
- **API Documentation:** Swagger/OpenAPI

## Architecture
- **Repository Structure:** Monorepo with packages/frontend and packages/backend
- **Package Management:** npm workspaces for shared dependencies
- **API Communication:** RESTful API with JSON payloads
- **State Management:** Client-side state management with React Context

## Security Considerations
- Password hashing with bcrypt (12+ rounds)
- JWT tokens with appropriate expiration
- CORS configuration for API access
- Input validation and sanitization
- Rate limiting for API endpoints

## Scalability Considerations
- Database indexing for performance
- Connection pooling with Prisma
- Caching layer (optional: Redis) for future enhancements
- Horizontal scaling capability with Docker containers