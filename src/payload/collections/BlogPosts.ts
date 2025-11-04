import { CollectionConfig } from 'payload/types';

const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['featuredImage', 'title', 'author', 'publishedDate', 'status'],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/blog/${doc.slug}`;
    },
  },
  access: {
    read: ({ req }) => {
      // Allow public access to published posts
      if (req.query?.status === 'published') {
        return true;
      }
      // Admin access to all posts
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
        description: 'Blog post title (max 100 characters)',
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
      name: 'author',
      type: 'relationship',
      relationTo: 'team',
      required: true,
      admin: {
        description: 'Team member who wrote this post',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Publication date and time',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main image for the blog post',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Brief summary for blog listing (max 300 chars)',
        rows: 4,
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full blog post content',
      },
    },
    {
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Technology, Design, Business',
          },
        },
      ],
      admin: {
        description: 'Blog post categories for organization',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., react, design, startup',
          },
        },
      ],
      admin: {
        description: 'Tags for better searchability',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      defaultValue: 5,
      admin: {
        description: 'Estimated reading time in minutes',
        step: 1,
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
        description: 'Published posts are visible on the blog',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in featured posts section',
      },
    },
    {
      name: 'seoTitle',
      type: 'text',
      maxLength: 60,
      admin: {
        description: 'SEO title (max 60 chars)',
        placeholder: 'Leave blank to use post title',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        description: 'SEO meta description (max 160 chars)',
        rows: 3,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, siblingData }) => {
        // Auto-generate SEO title if not provided
        if (!data.seoTitle && data.title) {
          data.seoTitle = data.title;
        }

        // Auto-calculate read time based on content length if not provided
        if (!data.readTime && siblingData.content) {
          const wordCount = siblingData.content.split(/\s+/).length;
          const readingSpeed = 200; // Average reading speed per minute
          const calculatedReadTime = Math.ceil(wordCount / readingSpeed);
          data.readTime = calculatedReadTime || 1;
        }

        return data;
      },
    ],
  },
};

export default BlogPosts;