# Turning Point CMS

Payload CMS for the Turning Point website with full content management capabilities.

## Features

- **Admin Panel**: Full-featured admin interface at `/admin`
- **PostgreSQL Database**: Robust data storage with PostgreSQL
- **Media Management**: Image optimization and file uploads
- **Authentication**: Secure admin access with role-based permissions
- **Rich Text Editor**: Advanced content editing with Lexical
- **TypeScript Support**: Fully typed with auto-generated types
- **SEO Tools**: Built-in SEO optimization for all content

## Collections

1. **Pages** - Website pages with rich content and SEO
2. **Services** - Service offerings with features and related projects
3. **Projects** - Portfolio items with galleries and testimonials
4. **Team** - Team member profiles and information
5. **Blog Posts** - Blog content with categories and tags
6. **Testimonials** - Client testimonials with ratings
7. **Contact Submissions** - Contact form submissions
8. **Site Settings** - Global site configuration (singleton)
9. **Media** - File and image management
10. **Users** - Admin user management

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL (or use provided Docker setup)

### Installation

1. Clone and install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Set up your environment variables in `.env`:
```env
DATABASE_URL=postgresql://payload:password@localhost:5432/turning_point
PAYLOAD_SECRET=your-super-secret-key-change-this
```

### Option 1: Using Docker (Recommended)

1. Start PostgreSQL database:
```bash
docker-compose up -d
```

### Option 2: Manual PostgreSQL Setup

1. Create database:
```sql
CREATE DATABASE turning_point;
CREATE USER payload WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE turning_point TO payload;
```

### Start Development

1. Seed the database:
```bash
npm run seed
```

2. Start development server:
```bash
npm run dev
```

3. Visit admin panel: `http://localhost:3000/admin`

**Default Admin Login:**
- Email: admin@turningpoint.com
- Password: admin123456

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run generate:types` - Generate TypeScript types
- `npm run seed` - Seed database with initial data
- `npm run typecheck` - Check TypeScript types

## Project Structure

```
src/
├── payload/
│   ├── collections/          # Collection definitions
│   ├── access/              # Access control functions
│   ├── hooks/               # Custom hooks
│   └── payload.config.ts    # Main Payload configuration
├── scripts/
│   └── seed.ts              # Database seeding script
└── server.ts                # Express server entry point
```

## Admin Access Control

**Admin Role:**
- Full access to all collections and settings
- User management
- System configuration

**Editor Role:**
- Create and update content
- No access to settings or user management

## Development Tips

1. **Auto-save**: Content is automatically saved as drafts
2. **Preview**: Use preview mode to see content before publishing
3. **Relationships**: All collections are properly linked
4. **SEO**: Each content type has built-in SEO optimization
5. **Media**: Images are automatically optimized for web

## Production Deployment

1. Set production environment variables
2. Build the project:
```bash
npm run build
```

3. Start production server:
```bash
npm start
```

## Support

For Payload CMS documentation: [payloadcms.com](https://payloadcms.com)

For project-specific issues, contact the development team.