# Bookworm Hanoi - Frontend

Frontend application for Bookworm Hanoi bookstore, inspired by the design of [Bookworm Hanoi](https://www.bookwormhanoi.com/).

## Features

- 🏠 **Home Page**: Hero section, new arrivals, categories showcase
- 📚 **Book Browsing**: Search and filter books by title, author, and type
- 📖 **Book Details**: Detailed book information with images
- 🛒 **Shopping Cart**: Add, update, and remove items from cart
- 👤 **User Authentication**: Login, register, email verification
- 🔐 **OAuth2**: Google login integration
- 👨‍💼 **Admin Panel**: User and book management (admin only)
- 📱 **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **TanStack Query** for data fetching and caching
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Heroicons** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend server running on `http://localhost:8080`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.tsx    # Main navigation header
│   ├── Footer.tsx    # Footer component
│   ├── BookCard.tsx  # Book card component
│   ├── HeroSection.tsx # Hero section component
│   └── ProtectedRoute.tsx # Route protection component
├── pages/            # Page components
│   ├── Home.tsx      # Home page
│   ├── BookList.tsx  # Book listing page
│   ├── BookDetail.tsx # Book detail page
│   ├── Cart.tsx      # Shopping cart page
│   ├── Login.tsx     # Login page
│   ├── Register.tsx  # Registration page
│   ├── Admin.tsx     # Admin panel
│   └── NotFound.tsx  # 404 page
├── services/         # API service layer
│   ├── api.ts        # Axios instance configuration
│   ├── authService.ts # Authentication API calls
│   ├── bookService.ts # Book API calls
│   ├── cartService.ts # Cart API calls
│   └── userService.ts # User API calls
├── context/          # React contexts
│   └── AuthContext.tsx # Authentication context
└── App.tsx           # Main app component
```

## API Integration

The frontend connects to the backend API at `http://localhost:8080/api/v1`. All API calls are handled through service files in the `services/` directory.

### Authentication

- JWT tokens are stored in localStorage
- Tokens are automatically added to API requests via axios interceptors
- Protected routes require authentication

### Environment Variables

You can configure the API base URL by modifying `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8080/api/v1';
```

## Features Overview

### Home Page
- Hero section with promotional banners
- New arrivals section
- Category showcase
- Feature highlights

### Book Browsing
- Search by title or author
- Filter by book type
- Pagination support
- Responsive grid layout

### Shopping Cart
- Add items to cart
- Update quantities
- Remove items
- Calculate totals and shipping

### Admin Panel
- User management (view, update role, delete)
- Book management (coming soon)
- Protected admin routes

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## License

This project is part of the Bookworm Hanoi bookstore application.

