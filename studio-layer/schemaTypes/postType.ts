import {defineArrayMember, defineField, defineType} from 'sanity'

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
      description: 'Click "Generate" to create a slug. Editing manually is not recommended.',
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
      title: 'Body',
      of: [
        defineArrayMember({
          type: 'block',
        }),
        defineArrayMember({
          type: 'youTube',
        }),
        defineArrayMember({
          type: 'image',
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Select one or more tags for this post.',
      of: [{type: 'reference', to: [{type: 'tags'}]}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
