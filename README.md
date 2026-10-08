# Talabat Backend API

A RESTful e-commerce backend API built with NestJS and TypeScript.

The project provides authentication, product management, categories, brands, orders, caching, email services, file uploads, MongoDB integration, Redis, JWT authentication and payment integration.

---

## Features

- User authentication
- Customer registration
- Email OTP verification
- Login with JWT
- Password reset
- OTP generation
- Password hashing with bcrypt
- MongoDB with Mongoose
- Repository pattern
- Category management
- Brand management
- Product creation
- Order creation
- Cash on Delivery
- Kashier payment integration
- Redis caching
- Email service
- AWS S3 file upload
- Global validation
- Global exception handling
- JWT authentication guard
- Request logging
- Swagger API documentation
- Unit testing
- Docker support

---

## Tech Stack

- Node.js
- TypeScript
- NestJS
- MongoDB
- Mongoose
- Redis
- JWT
- bcrypt
- Nodemailer
- AWS S3
- Jest
- Swagger
- Docker

---

## Architecture

The project follows a modular NestJS architecture.

```text
src/
├── common/
├── config/
├── models/
├── modules/
├── shared/
├── app.module.ts
└── main.ts