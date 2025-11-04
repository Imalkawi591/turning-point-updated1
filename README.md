# Turning Point Consulting - Next.js 14 Application

A modern web application for Turning Point consulting firm built with Next.js 14, TypeScript, Tailwind CSS, and Payload CMS.

## 🚀 Tech Stack

- **Framework**: Next.js 14.2+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **CMS**: Payload CMS 2.x
- **Database**: PostgreSQL
- **Code Quality**: ESLint & Prettier

## 📁 Project Structure

```
/src
  /app          # Next.js App Router pages and routes
  /components   # Reusable React components
  /payload      # Payload CMS configuration and collections
  /lib          # Utility functions and helpers
  /styles       # Global styles and CSS
/public         # Static assets
```

## 🛠️ Prerequisites

- Node.js 18.17.0 or higher
- npm 9.6.7 or higher
- PostgreSQL database

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Turning-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and update with your values:

```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `PAYLOAD_SECRET`: Secret key for Payload CMS
- `NEXT_PUBLIC_SERVER_URL`: Your application URL
- `SMTP_*`: Email service configuration (Nodemailer)

### 4. Set up the database

Make sure your PostgreSQL database is running and accessible via the `DATABASE_URL`.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run payload:generate:types` - Generate Payload CMS types
- `npm run db:seed` - Seed database with initial data
- `npm run db:migrate` - Run database migrations

## 🎨 Design System

The application uses a custom design system with:

### Colors
- **Primary**: #008ceb (medium blue)
- **Secondary**: #082846 (midnight blue)
- **Custom color palette** with various shades for consistency

### Typography
- **Font**: Inter (professional sans-serif)
- Responsive typography scaling

### Breakpoints
- `xs`: 475px
- `sm`: 640px (Tailwind default)
- `md`: 768px (Tailwind default)
- `lg`: 1024px (Tailwind default)
- `xl`: 1280px (Tailwind default)
- `2xl`: 1536px (Tailwind default)
- `3xl`: 1600px (custom)

## 🏗️ Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint + Prettier for consistent formatting
- Absolute imports using `@/` prefix

### File Organization
- Components in `/src/components`
- Pages and routes in `/src/app` (App Router)
- Payload CMS configuration in `/src/payload`
- Utilities in `/src/lib`

## 📦 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables for Production

Make sure to set all required environment variables in your production environment:
- `NODE_ENV=production`
- Database connection
- Payload CMS secret
- Server URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

[Add your license information here]

## 📞 Support

For support or questions, please contact the development team.
