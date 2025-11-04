import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    group: 'Media',
    defaultColumns: ['filename', 'alt', 'filesize', 'updatedAt'],
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
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 1200,
        height: 900,
        position: 'centre',
      },
      {
        name: 'large',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
    ],
    filesize: 10 * 1024 * 1024, // 10MB
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
    {
      name: 'filename',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'mimeType',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'filesize',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'width',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'height',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate alt text if not provided
        if (!data.alt && data.filename) {
          const name = data.filename.replace(/\.[^/.]+$/, '');
          data.alt = name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
        return data;
      },
    ],
  },
};

export default Media;