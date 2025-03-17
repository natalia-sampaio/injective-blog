import {defineField, defineType} from 'sanity'

export const featuredPostsType = defineType({
  name: 'featuredPosts',
  title: 'Featured Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredPosts',
      title: 'Featured Posts',
      description:
        'Allows editors to showcase four key articles in the hero section of the blog. The order of the posts in the document determines their placement on the page, meaning the first post will always be the main feature, and the next three will be positioned as supporting posts.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      validation: (rule) => rule.required().min(4).max(4),
    }),
  ],
  preview: {
    select: {
      title: 'featuredTitle',
    },
    prepare() {
      return {
        title: 'Manage Featured Posts',
      }
    },
  },
})
