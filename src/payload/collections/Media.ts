import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    group: 'Media',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Alt text for accessibility',
        placeholder: 'Describe the image for screen readers',
      },
    },
    {
      name: 'caption',
      type: 'text',
      maxLength: 300,
      admin: {
        description: 'Image caption or description',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate alt text if not provided
        if (!data.alt && data.filename) {
          const name = data.filename.replace(/\.[^/.]+$/, '');
          data.alt = name.replace(/[-_]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
        }
        return data;
      },
    ],
  },
};

export default Media;
