import {defineField, defineType} from 'sanity'

export const tagsType = defineType({
  name: 'tags',
  title: 'Tags',
  type: 'document',
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
      description: 'Click "Generate" to create a slug. Editing manually is not recommended.',
      type: 'slug',
      options: {
        source: 'title',
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
})
