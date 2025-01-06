# Taskhive Backend

A robust Node.js backend service for the Taskhive task management application, built with Express and TypeScript.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB
- Git

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd Taskhive-backend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env-example .env
```

Fill in the required environment variables in the `.env` file:

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT authentication
- `NODE_ENV`: Environment (development/production)
- `GOOGLE_APP_PASSWORD`: Google app password for email services
- `CLIENT_URL`: Frontend application URL
- `RESET_PASSWORD_URL`: Password reset page URL
- `LIVEKIT_API_KEY`: LiveKit API key
- `LIVEKIT_API_SECRET`: LiveKit API secret
- `LIVEKIT_URL`: LiveKit server URL

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The server will start on the specified PORT (default: 5000)

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Real-time Features:** LiveKit
- **Email Service:** Nodemailer

## 📁 Project Structure

```
src/
├── controllers/    # Route controllers
├── models/        # MongoDB models
├── routes/        # API routes
├── middleware/    # Custom middleware
├── services/      # Business logic
├── utils/         # Utility functions
├── types/         # TypeScript types
└── nodemailer/    # Email templates and services
```

## 🔑 API Features

- User Authentication & Authorization
- Workspace Management
- Task/Issue Management
- Team Member Management
- Real-time Collaboration
- Email Notifications
- Password Reset Functionality

## 📝 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Workspace Endpoints

- `POST /api/workspaces` - Create workspace
- `GET /api/workspaces` - Get user workspaces
- `PUT /api/workspaces/:id` - Update workspace
- `DELETE /api/workspaces/:id` - Delete workspace

### Issue Endpoints

- `POST /api/issues` - Create issue
- `GET /api/issues` - Get workspace issues
- `PUT /api/issues/:id` - Update issue
- `DELETE /api/issues/:id` - Delete issue

### Member Management

- `POST /api/invitations` - Invite team member
- `GET /api/invitations` - Get pending invitations
- `PUT /api/invitations/:id` - Accept/reject invitation
