import {defineField, defineType} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
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
