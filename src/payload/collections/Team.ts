import { CollectionConfig } from 'payload/types';

const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    group: 'Company',
    defaultColumns: ['photo', 'name', 'position', 'order', 'status'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Full name of the team member',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly version of the name',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (data?.name && !value) {
              const slug = data.name
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
      name: 'position',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Job title or position',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: {
        description: 'Professional biography and background',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Professional headshot or photo',
      },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Professional email address',
        placeholder: 'name@turningpoint.com',
      },
    },
    {
      name: 'linkedIn',
      type: 'text',
      admin: {
        placeholder: 'https://linkedin.com/in/username',
        description: 'LinkedIn profile URL (optional)',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order on team page (lower numbers first)',
        step: 1,
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on homepage and featured sections',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
      ],
      defaultValue: 'active',
      admin: {
        description: 'Only active team members are displayed on the website',
      },
    },
    {
      name: 'expertise',
      type: 'array',
      fields: [
        {
          name: 'skill',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Web Development, UX Design',
          },
        },
      ],
      admin: {
        description: 'List of expertise areas and skills',
      },
    },
  ],
};

export default Team;
