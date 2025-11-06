import { CollectionConfig } from 'payload/types';

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    group: 'Portfolio',
    defaultColumns: ['featuredImage', 'title', 'client', 'year', 'featured', 'status'],
  },
  access: {
    read: () => true,
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
        description: 'Project title (max 100 characters)',
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
      name: 'client',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Client company name',
      },
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 2000,
      max: 2030,
      admin: {
        description: 'Project completion year',
        step: 1,
      },
    },
    {
      name: 'serviceType',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      admin: {
        description: 'Services provided for this project',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main project image for portfolio display',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Image caption or description',
          },
        },
      ],
      admin: {
        description: 'Additional project images',
      },
    },
    {
      name: 'challenge',
      type: 'richText',
      required: true,
      admin: {
        description: 'The challenge or problem this project addressed',
      },
    },
    {
      name: 'solution',
      type: 'richText',
      required: true,
      admin: {
        description: 'The solution implemented for this project',
      },
    },
    {
      name: 'results',
      type: 'richText',
      required: true,
      admin: {
        description: 'The results and outcomes of this project',
      },
    },
    {
      name: 'testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
      hasOne: true,
      admin: {
        description: 'Client testimonial for this project (optional)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on homepage and featured projects sections',
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
        description: 'Published projects are visible in the portfolio',
      },
    },
    {
      name: 'seoTitle',
      type: 'text',
      maxLength: 60,
      admin: {
        description: 'SEO title (max 60 chars)',
        placeholder: 'Leave blank to use project title',
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
      ({ data }) => {
        // Auto-generate SEO title if not provided
        if (!data.seoTitle && data.title) {
          data.seoTitle = `${data.title} - ${data.client || 'Turning Point Project'}`;
        }
        return data;
      },
    ],
  },
};

export default Projects;