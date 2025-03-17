import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The main title of your site, used for SEO and browser titles.',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(160),
      description: 'A short description of your site (max 160 characters) for SEO.',
    }),
    defineField({
      name: 'sitePreview',
      title: 'Site Preview',
      type: 'image',
      description:
        'Upload an image for social sharing previews. If left blank, an automatic screenshot of the live site will be used instead.',
      options: {hotspot: true},
    }),
  ],
})
