import { CollectionConfig } from 'payload/types';

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    group: 'Company',
    defaultColumns: ['clientName', 'clientCompany', 'rating', 'featured', 'status'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Full name of the client providing the testimonial',
      },
    },
    {
      name: 'clientPosition',
      type: 'text',
      maxLength: 100,
      admin: {
        description: 'Job title or position of the client',
        placeholder: 'e.g., CEO, Marketing Director',
      },
    },
    {
      name: 'clientCompany',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Client company name',
      },
    },
    {
      name: 'clientPhoto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Client photo (optional, for personalization)',
      },
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
      maxLength: 500,
      admin: {
        description: 'Client testimonial text (max 500 chars)',
        rows: 6,
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Star rating (1-5 stars)',
        step: 1,
      },
    },
    {
      name: 'relatedProject',
      type: 'relationship',
      relationTo: 'projects',
      admin: {
        description: 'Project this testimonial is about (optional)',
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
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Pending',
          value: 'pending',
        },
      ],
      defaultValue: 'pending',
      admin: {
        description: 'Only approved testimonials are displayed on the website',
      },
    },
    {
      name: 'dateReceived',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        date: {
        pickerAppearance: 'dayAndTime',        },
        description: 'Date when testimonial was received',
      },
    },
    {
      name: 'serviceProvided',
      type: 'relationship',
      relationTo: 'services',
      hasMany: false,
      admin: {
        description: 'Service this testimonial is about (optional)',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-set status to approved if featured
        if (data.featured && data.status === 'pending') {
          data.status = 'approved';
        }
        return data;
      },
    ],
  },
};

export default Testimonials;