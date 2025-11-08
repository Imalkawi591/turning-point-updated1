import payload from 'payload';
import path from 'path';
import 'dotenv/config';

const seed = async () => {
  try {
    await payload.init({
  secret: process.env.PAYLOAD_SECRET || 'temp-secret-for-seeding',
  local: true,
});

    console.log('🌱 Starting database seed...');

    // Check if admin user already exists
    const existingAdmin = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: process.env.ADMIN_EMAIL || 'admin@turningpoint.com',
        },
      },
    });

    if (existingAdmin.totalDocs === 0) {
      // Create admin user
      const adminUser = await payload.create({
        collection: 'users',
        data: {
          email: process.env.ADMIN_EMAIL || 'admin@turningpoint.com',
          password: process.env.ADMIN_PASSWORD || 'admin123456',
          firstName: process.env.ADMIN_FIRST_NAME || 'Admin',
          lastName: process.env.ADMIN_LAST_NAME || 'User',
          role: 'admin',
        },
      });
      console.log('✅ Created admin user:', adminUser.email);
    } else {
      console.log('ℹ️ Admin user already exists, skipping...');
    }

    // Create site settings if they don't exist
    const existingSettings = await payload.findGlobal({
      slug: 'site-settings',
    });

    if (!existingSettings) {
      const siteSettings = await payload.create({
        collection: 'site-settings',
        data: {
          siteName: 'Turning Point',
          tagline: 'Transforming Ideas into Digital Reality',
          contactEmail: 'contact@turningpoint.com',
          contactPhone: '+1 (555) 123-4567',
          officeAddress: '123 Business Street, Suite 100\nCity, State 12345\nUnited States',
          socialLinks: {
            linkedin: 'https://linkedin.com/company/turning-point',
            twitter: 'https://twitter.com/turningpoint',
            facebook: 'https://facebook.com/turningpoint',
            instagram: 'https://instagram.com/turningpoint',
          },
          seo: {
            defaultTitle: 'Turning Point - Digital Solutions',
            defaultDescription: 'Professional digital services to help your business grow and succeed in the modern marketplace.',
            keywords: 'digital marketing, web development, consulting, business solutions',
          },
          footer: {
            copyrightText: `© ${new Date().getFullYear()} Turning Point. All rights reserved.`,
          },
        },
      });
      console.log('✅ Created site settings');
    } else {
      console.log('ℹ️ Site settings already exist, skipping...');
    }

    // Create sample team members
    const teamMembers = [
      {
        name: 'John Smith',
        position: 'CEO & Founder',
        bio: '<p>John is the visionary behind Turning Point with over 15 years of experience in digital transformation and business strategy.</p>',
        email: 'john@turningpoint.com',
        status: 'active',
        featured: true,
        order: 1,
        expertise: [
          { skill: 'Business Strategy' },
          { skill: 'Digital Transformation' },
          { skill: 'Leadership' },
        ],
      },
      {
        name: 'Sarah Johnson',
        position: 'Creative Director',
        bio: '<p>Sarah brings creative excellence to every project with her background in design and user experience.</p>',
        email: 'sarah@turningpoint.com',
        status: 'active',
        featured: true,
        order: 2,
        expertise: [
          { skill: 'UI/UX Design' },
          { skill: 'Brand Development' },
          { skill: 'Creative Strategy' },
        ],
      },
      {
        name: 'Mike Chen',
        position: 'Technical Lead',
        bio: '<p>Mike leads our technical team with expertise in full-stack development and system architecture.</p>',
        email: 'mike@turningpoint.com',
        status: 'active',
        featured: true,
        order: 3,
        expertise: [
          { skill: 'Web Development' },
          { skill: 'System Architecture' },
          { skill: 'Cloud Computing' },
        ],
      },
    ];

    for (const member of teamMembers) {
      const existingMember = await payload.find({
        collection: 'team',
        where: {
          email: {
            equals: member.email,
          },
        },
      });

      if (existingMember.totalDocs === 0) {
        const teamMember = await payload.create({
          collection: 'team',
          data: member,
        });
        console.log('✅ Created team member:', teamMember.name);
      } else {
        console.log(`ℹ️ Team member ${member.name} already exists, skipping...`);
      }
    }

    // Create sample services
    const services = [
      {
        title: 'Web Development',
        slug: 'web-development',
        icon: 'fas fa-code',
        shortDescription: 'Custom web applications built with modern technologies and best practices.',
        fullDescription: '<p>We create powerful, scalable web applications tailored to your business needs. Our development process ensures high performance, security, and user experience excellence.</p>',
        keyFeatures: [
          { feature: 'Responsive Design' },
          { feature: 'Modern Tech Stack' },
          { feature: 'SEO Optimized' },
          { feature: 'Performance Focused' },
        ],
        order: 1,
        status: 'published',
      },
      {
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        icon: 'fas fa-bullhorn',
        shortDescription: 'Strategic digital marketing to grow your online presence and reach your target audience.',
        fullDescription: '<p>Our digital marketing services help you connect with your audience and achieve measurable business growth through data-driven strategies.</p>',
        keyFeatures: [
          { feature: 'SEO & SEM' },
          { feature: 'Social Media Marketing' },
          { feature: 'Content Strategy' },
          { feature: 'Analytics & Reporting' },
        ],
        order: 2,
        status: 'published',
      },
      {
        title: 'Brand Strategy',
        slug: 'brand-strategy',
        icon: 'fas fa-palette',
        shortDescription: 'Develop compelling brand identities that resonate with your target audience.',
        fullDescription: '<p>We help you build a strong brand foundation that stands out in the marketplace and creates lasting connections with customers.</p>',
        keyFeatures: [
          { feature: 'Brand Identity Design' },
          { feature: 'Market Research' },
          { feature: 'Competitive Analysis' },
          { feature: 'Brand Guidelines' },
        ],
        order: 3,
        status: 'published',
      },
    ];

    for (const service of services) {
      const existingService = await payload.find({
        collection: 'services',
        where: {
          slug: {
            equals: service.slug,
          },
        },
      });

      if (existingService.totalDocs === 0) {
        const createdService = await payload.create({
          collection: 'services',
          data: service,
        });
        console.log('✅ Created service:', createdService.title);
      } else {
        console.log(`ℹ️ Service ${service.title} already exists, skipping...`);
      }
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Admin Login Credentials:');
    console.log(`   Email: ${process.env.ADMIN_EMAIL || 'admin@turningpoint.com'}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123456'}`);
    console.log('\n🚀 Start the development server with: npm run dev');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seed();