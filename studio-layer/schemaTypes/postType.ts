import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Featured', value: 'featured'},
              {title: 'Chain', value: 'chain'},
              {title: 'dApps', value: 'dapps'},
              {title: 'Infrastructure', value: 'infrastructure'},
              {title: 'Tokenization', value: 'tokenization'},
              {title: 'Community', value: 'community'},
              {title: 'Learn', value: 'learn'},
            ],
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
