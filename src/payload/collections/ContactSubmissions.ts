import { CollectionConfig } from 'payload/types';

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'subject',
    group: 'Contact',
    defaultColumns: ['name', 'email', 'subject', 'submittedAt', 'read'],
    disableDuplicate: true,
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true, // Public access for contact forms
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Full name of the contact person',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address for response',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Phone number (optional)',
        placeholder: '+1 (555) 123-4567',
      },
    },
    {
      name: 'company',
      type: 'text',
      maxLength: 100,
      admin: {
        description: 'Company name (optional)',
      },
    },
    {
      name: 'subject',
      type: 'text',
      maxLength: 200,
      admin: {
        description: 'Subject of the inquiry',
        placeholder: 'e.g., Project inquiry, Partnership opportunity',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: 2000,
      admin: {
        description: 'Detailed message from the contact',
        rows: 8,
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as read',
      },
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        {
          label: 'Low',
          value: 'low',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'High',
          value: 'high',
        },
        {
          label: 'Urgent',
          value: 'urgent',
        },
      ],
      defaultValue: 'medium',
      admin: {
        description: 'Priority level for response',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Team member assigned to handle this submission',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this submission and follow-up actions',
        rows: 4,
      },
    },
    {
      name: 'source',
      type: 'select',
      options: [
        {
          label: 'Contact Form',
          value: 'contact-form',
        },
        {
          label: 'Email',
          value: 'email',
        },
        {
          label: 'Phone',
          value: 'phone',
        },
        {
          label: 'Social Media',
          value: 'social-media',
        },
        {
          label: 'Referral',
          value: 'referral',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      defaultValue: 'contact-form',
      admin: {
        description: 'How this contact was received',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-set submittedAt for new submissions
        if (operation === 'create' && !data.submittedAt) {
          data.submittedAt = new Date();
        }
        return data;
      },
    ],
  },
};

export default ContactSubmissions;