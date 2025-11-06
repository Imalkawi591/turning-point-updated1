import { CollectionConfig } from 'payload/types';

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'status', 'updatedAt'],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/preview/${doc.slug}`;
    },
  },
  access: {
    read: ({ req }) => {
      // Allow public access to published pages
      if (req.query?.status === 'published') {
        return true;
      }
      // Admin access to all pages
      return !!req.user;
    },
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Page title (max 100 characters)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
      hooks: {
        beforeValidate: [
          ({ siblingData, value }) => {
            if (siblingData.title && !value) {
              const slug = siblingData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              return slug;
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main page content with formatting options',
      },
    },
    {
      name: 'seoTitle',
      type: 'text',
      maxLength: 60,
      admin: {
        description: 'SEO title (max 60 chars for optimal display)',
        placeholder: 'Leave blank to use page title',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        description: 'SEO meta description (max 160 chars for search results)',
        rows: 3,
      },
    },
    {
      name: 'seoImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image shown when this page is shared on social media',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        description: 'Published pages are visible to the public',
      },
    },
    {
      name: 'template',
      type: 'select',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Homepage',
          value: 'homepage',
        },
        {
          label: 'Contact',
          value: 'contact',
        },
        {
          label: 'About',
          value: 'about',
        },
      ],
      defaultValue: 'default',
      admin: {
        description: 'Page template for frontend rendering',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate SEO title if not provided
        if (!data.seoTitle && data.title) {
          data.seoTitle = data.title;
        }
        return data;
      },
    ],
  },
};

export default Pages;