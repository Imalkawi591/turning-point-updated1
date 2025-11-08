import { CollectionConfig } from 'payload/types';
import { FieldHook } from 'payload/types';

const formatUsername = (value: string): string =>
  value
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();

const usernameHook: FieldHook = ({ value }) => formatUsername(value);

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'firstName',
    group: 'Admin',
    defaultColumns: ['firstName', 'lastName', 'email', 'role'],
  },
  auth: true,
  access: {
    read: ({ req }) => req.user?.role === 'admin' || {
      id: {
        equals: req.user?.id,
      },
    },
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin' || {
      id: {
        equals: req.user?.id,
      },
    },
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
      admin: {
        description: 'Admin has full access, Editor can create/update content only',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'User profile photo',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'Short biography for team members',
      },
    },
    {
      name: 'linkedin',
      type: 'text',
      admin: {
        placeholder: 'https://linkedin.com/in/username',
        description: 'LinkedIn profile URL',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Active users can log in to the admin panel',
      },
    },
  ],
  hooks: {
  beforeChange: [  // ✅ v2 syntax
    ({ data, req }) => {
        // Set first user as admin if no role specified
        if (!data.role && req.user === null) {
          data.role = 'admin';
        }
        return data;
      },
    ],
  },
};

export default Users;