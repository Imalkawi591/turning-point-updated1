import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import path from 'path';
import Users from './collections/Users';
import Media from './collections/Media';
import Pages from './collections/Pages';
import Services from './collections/Services';
import Projects from './collections/Projects';
import Team from './collections/Team';
import BlogPosts from './collections/BlogPosts';
import Testimonials from './collections/Testimonials';
import ContactSubmissions from './collections/ContactSubmissions';
import SiteSettings from './collections/SiteSettings';

export default buildConfig({
  admin: {
  user: Users.slug,
  meta: {
    titleSuffix: '- Turning Point CMS',
    favicon: '/favicon.ico',
  },
  bundler: webpackBundler(),
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
  editor: slateEditor({}),
  db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  migrationDir: path.resolve(__dirname, 'migrations'),
}),
  typescript: {
    outputFile: path.resolve(__dirname, '../../payload-types.ts'),
  },
 plugins: [
  // Cloudinary integration will be handled through upload hooks in Media collection
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
