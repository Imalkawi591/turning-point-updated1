import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Services } from './collections/Services';
import { Projects } from './collections/Projects';
import { Team } from './collections/Team';
import { BlogPosts } from './collections/BlogPosts';
import { Testimonials } from './collections/Testimonials';
import { ContactSubmissions } from './collections/ContactSubmissions';
import { SiteSettings } from './collections/SiteSettings';

export default buildConfig({
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, 'admin.css'),
    meta: {
      titleSuffix: '- Turning Point CMS',
      favicon: '/favicon.ico',
    },
    components: {
      // Add custom dashboard components here if needed
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Services,
    Projects,
    Team,
    BlogPosts,
    Testimonials,
    ContactSubmissions,
    SiteSettings,
  ],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    migrationDir: path.resolve(__dirname, 'migrations'),
  }),
  typescript: {
    outputFile: path.resolve(__dirname, '../../payload-types.ts'),
  },
  plugins: [
    // Add plugins here as needed
  ],
  cors: [
    process.env.PAYLOAD_PUBLIC_CORS_ORIGIN || 'http://localhost:3000',
    'http://localhost:3000',
  ],
  csrf: [
    process.env.PAYLOAD_PUBLIC_CSRF_ORIGIN || 'http://localhost:3000',
    'http://localhost:3000',
  ],
});