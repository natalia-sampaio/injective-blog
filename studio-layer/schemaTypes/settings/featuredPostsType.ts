import {defineField, defineType} from 'sanity'

export const featuredPostsType = defineType({
  name: 'featuredPosts',
  title: 'Featured Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredPosts',
      title: 'Featured Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      validation: (rule) => rule.required().min(4).max(4),
    }),
  ],
})
