import { CollectionConfig } from 'payload/types';

const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: {
    useAsTitle: 'siteName',
    group: 'Settings',
  },
  access: {
    read: () => true, // Public access for frontend
    create: () => false, // Prevent multiple instances
    update: () => true,
    delete: () => false, // Prevent deletion
  },
  versions: false,
  singleton: true,
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Turning Point',
      maxLength: 100,
      admin: {
        description: 'Name of the website/company',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      maxLength: 200,
      admin: {
        description: 'Company tagline or slogan',
        placeholder: 'e.g., Transforming Ideas into Reality',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Company logo for header and branding',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Website favicon (should be square, ideally 32x32 or 64x64)',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      admin: {
        description: 'Main contact email address',
        placeholder: 'contact@turningpoint.com',
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      admin: {
        description: 'Main contact phone number',
        placeholder: '+1 (555) 123-4567',
      },
    },
    {
      name: 'officeAddress',
      type: 'textarea',
      admin: {
        description: 'Full office address for footer and contact page',
        rows: 4,
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            placeholder: 'https://linkedin.com/company/...',
            description: 'LinkedIn company page URL',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          admin: {
            placeholder: 'https://twitter.com/...',
            description: 'Twitter profile URL',
          },
        },
        {
          name: 'facebook',
          type: 'text',
          admin: {
            placeholder: 'https://facebook.com/...',
            description: 'Facebook page URL',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          admin: {
            placeholder: 'https://instagram.com/...',
            description: 'Instagram profile URL',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          admin: {
            placeholder: 'https://youtube.com/...',
            description: 'YouTube channel URL',
          },
        },
      ],
      admin: {
        description: 'Social media profile links',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'defaultTitle',
          type: 'text',
          maxLength: 60,
          admin: {
            description: 'Default SEO title for pages without specific titles',
          },
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Default SEO description for pages without specific descriptions',
            rows: 3,
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Default SEO keywords (comma-separated)',
          },
        },
      ],
      admin: {
        description: 'Default SEO settings',
      },
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          admin: {
            placeholder: 'G-XXXXXXXXXX',
            description: 'Google Analytics measurement ID',
          },
        },
        {
          name: 'googleTagManagerId',
          type: 'text',
          admin: {
            placeholder: 'GTM-XXXXXXX',
            description: 'Google Tag Manager container ID',
          },
        },
        {
          name: 'metaPixelId',
          type: 'text',
          admin: {
            placeholder: 'XXXXXXXXXXXXXXXX',
            description: 'Meta Pixel ID for Facebook/Meta tracking',
          },
        },
      ],
      admin: {
        description: 'Analytics and tracking settings',
      },
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          defaultValue: '© 2024 Turning Point. All rights reserved.',
          admin: {
            description: 'Copyright text for footer',
          },
        },
        {
          name: 'privacyPolicyLink',
          type: 'text',
          admin: {
            description: 'Link to privacy policy page',
          },
        },
        {
          name: 'termsOfServiceLink',
          type: 'text',
          admin: {
            description: 'Link to terms of service page',
          },
        },
      ],
      admin: {
        description: 'Footer settings and links',
      },
    },
  ],
};

export default SiteSettings;