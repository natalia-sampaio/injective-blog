import {defineField, defineType} from 'sanity'

export const tagsType = defineType({
  name: 'tags',
  title: 'Tags',
  type: 'document',
  fields: [
    defineField({
      name: 'tagList',
      title: 'Tag List',
      type: 'array',
      description: 'Manage the list of tags available for blog posts.',
      of: [
        {
          type: 'object',
          name: 'tag',
          title: 'Tag',
          fields: [
            defineField({
              name: 'title',
              title: 'Tag Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Tag Slug',
              type: 'slug',
              description:
                'Click "Generate" to create a slug. It is not recommended to edit it manually.',
              options: {
                source: (doc, options) => options.parent?.title,
                slugify: (input) => `/tag/${input.toLowerCase().replace(/\s+/g, '-')}`,
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            prepare({title, slug}) {
              return {
                title: title,
                subtitle: slug ? `${slug}` : 'No slug generated',
              }
            },
          },
        },
      ],
    }),
  ],
})
