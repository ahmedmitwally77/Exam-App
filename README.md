# 📚 Exam App - Online Examination Platform

A modern, full-featured online examination system built with Next.js 14, TypeScript, and TailwindCSS. This application provides a complete solution for managing and taking exams with a beautiful, responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![React Query](https://img.shields.io/badge/React_Query-5.0-ff4154?style=for-the-badge&logo=react-query)

## ✨ Features

### 🔐 Authentication System
- **User Registration** - Create new accounts with email verification
- **Secure Login** - JWT-based authentication with NextAuth.js
- **Password Recovery** - Multi-step password reset process with OTP verification
  - Email verification step
  - OTP validation
  - New password setup
- **Session Management** - Persistent authentication across sessions
- **Protected Routes** - Middleware-based route protection

### 👤 User Account Management
- **Profile Management**
  - Update personal information
  - Change profile picture
  - Phone number management
- **Password Management**
  - Change password securely
  - Password strength validation
- **Account Settings** - Comprehensive account customization

### 📊 Dashboard
- **Subject Overview** - Visual grid display of available diplomas/subjects
- **Beautiful Card Layout** - Hover effects and smooth transitions
- **Responsive Design** - Optimized for all screen sizes
- **Quick Navigation** - Easy access to exams and account settings

### 📝 Examination System
- **Exam Listing** - Browse available exams by subject
- **Exam Details**
  - Exam duration
  - Number of questions
  - Subject information
- **Interactive Quiz Interface**
  - Question navigation
  - Answer selection
  - Real-time progress tracking
- **Timer System**
  - Visual countdown timer with radial progress
  - Automatic submission when time expires
  - Time warnings
- **Exam Submission** - Secure answer submission and results

### 🎨 UI Components
- **Modern Design System** - Built with Radix UI primitives
- **Custom Components**
  - Responsive navigation
  - User profile dropdown
  - Mobile menu with hamburger icon
  - Page headers with breadcrumbs
  - Alert dialogs
  - Toast notifications
  - Progress indicators
  - Scroll areas
- **Dark Mode Ready** - Prepared for dark theme implementation
- **Animations** - Smooth transitions and hover effects

### 📱 Responsive Features
- **Mobile-First Design** - Optimized for mobile devices
- **Tablet Support** - Perfect layout for medium screens
- **Desktop Optimization** - Full-featured desktop experience
- **Touch-Friendly** - Large touch targets and intuitive gestures

### 🛡️ Security Features
- **CSRF Protection** - Built-in security measures
- **Input Validation** - Zod schema validation
- **Sanitized Inputs** - XSS prevention
- **Secure Authentication** - JWT tokens with secure storage
- **Route Protection** - Middleware-based access control

## 🚀 Tech Stack

### Core Technologies
- **Next.js 14.2** - React framework with App Router
- **React 18** - Latest React features
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling

### State Management & Data Fetching
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Authentication
- **NextAuth.js 4.24** - Complete authentication solution
- **JWT** - Token-based authentication

### UI Components & Libraries
- **Radix UI** - Unstyled, accessible UI primitives
  - Alert Dialog
  - Avatar
  - Dialog
  - Dropdown Menu
  - Popover
  - Progress
  - Scroll Area
  - Separator
  - Toast
- **Lucide React** - Beautiful icon set
- **React Phone Number Input** - International phone input
- **Input OTP** - One-time password input
- **Recharts** - Charting library for data visualization
- **React Spinners** - Loading indicators
- **Sonner** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **Geist Font** - Modern typography
- **Class Variance Authority** - Component variants
- **clsx & tailwind-merge** - Conditional styling

## 📁 Project Structure

```
exam-app/
├── public/
│   └── assets/              # Static assets and images
├── src/
│   ├── app/
│   │   ├── (auth)/          # Authentication routes
│   │   │   ├── login/       # Login page
│   │   │   ├── register/    # Registration page
│   │   │   └── forgot-password/  # Password recovery
│   │   │       ├── _components/  # Form components
│   │   │       ├── _hooks/       # Custom hooks
│   │   │       └── _services/    # API services
│   │   ├── api/
│   │   │   └── auth/        # NextAuth API routes
│   │   ├── dashboard/       # Protected dashboard routes
│   │   │   ├── account/     # Account management
│   │   │   ├── exams/       # Exam pages
│   │   │   │   └── [id]/    # Individual exam page
│   │   │   └── _services/   # Dashboard services
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── error.tsx        # Error boundary
│   │   └── loading.tsx      # Loading state
│   ├── components/
│   │   ├── providers/       # Context providers
│   │   ├── shared/          # Shared components
│   │   │   ├── auth-shared/ # Auth-related components
│   │   │   └── dash-shared/ # Dashboard components
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── constants/       # App constants
│   │   ├── schemas/         # Zod validation schemas
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── auth.ts              # NextAuth configuration
│   └── middleware.ts        # Route middleware
├── components.json          # shadcn/ui configuration
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and pnpm installed
- Git for version control

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/ahmedmitwally77/Exam-App.git
cd exam-app
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment Setup**

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
AUTH_SECRET=your-auth-secret-here

# API Configuration
NEXT_PUBLIC_API_URL=your-api-url-here

# Optional: Add other environment variables as needed
```

4. **Run the development server**
```bash
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔧 Configuration

### NextAuth Configuration
The authentication is configured in `src/auth.ts` with custom pages and JWT strategy.

### Middleware
Route protection is handled in `src/middleware.ts` to secure dashboard routes.

### API Integration
All API services are organized in `_services` folders within their respective feature directories.

## 📱 Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/login` | User login |
| `/register` | User registration |
| `/forgot-password` | Password recovery |
| `/dashboard` | Main dashboard with subjects |
| `/dashboard/exams` | Exam listing |
| `/dashboard/exams/[id]` | Individual exam page |
| `/dashboard/account` | Account settings |
| `/dashboard/account/change-password` | Change password |

## 🎨 Design Philosophy

- **User-First**: Intuitive interface designed for ease of use
- **Performance**: Optimized for fast loading and smooth interactions
- **Accessibility**: Built with accessibility in mind using Radix UI
- **Responsive**: Works seamlessly across all device sizes
- **Modern**: Clean, contemporary design with smooth animations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Ahmed Mitwally**
- GitHub: [@ahmedmitwally77](https://github.com/ahmedmitwally77)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting solutions
- Radix UI for accessible components
- All open-source contributors

---

<div align="center">
  <p>Built with ❤️ using Next.js and TypeScript</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
