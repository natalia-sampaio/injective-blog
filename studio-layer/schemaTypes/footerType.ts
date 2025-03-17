import {defineField, defineType} from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'linkGroups',
      title: 'Footer Link Groups',
      type: 'array',
      description: 'Groups of links displayed in the footer.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Group Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'url',
                      title: 'URL',
                      type: 'url',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'url',
                    },
                  },
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Text displayed at the bottom of the footer.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'privacy',
      title: 'Privacy Policy',
      description: 'Link to the Injective Blog privacy policy.',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'terms',
      title: 'Terms of Use',
      description: 'Link to the Injective Blog terms of use.',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'footerTitle',
    },
    prepare() {
      return {
        title: 'Footer Configuration',
      }
    },
  },
})
