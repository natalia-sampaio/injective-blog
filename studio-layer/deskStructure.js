/* https://www.sanity.io/docs/structure-builder-cheat-sheet */

import {
  CogIcon,
  ComposeSparklesIcon,
  TagIcon,
  SparklesIcon,
  DocumentsIcon,
  EarthGlobeIcon,
  LinkIcon,
} from '@sanity/icons'

export const myStructure = (S) =>
  S.list()
    .title('Injective Blog')
    .items([
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('Metadata & SEO')
                .icon(EarthGlobeIcon)
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            ]),
        ),
      S.listItem()
        .title('Editorial Content')
        .icon(ComposeSparklesIcon)
        .child(
          S.list()
            .title('Manage Blog Content')
            .items([
              S.listItem()
                .title('Featured Posts')
                .icon(SparklesIcon)
                .child(S.document().schemaType('featuredPosts').documentId('featuredPosts')),
              S.documentTypeListItem('post').title('All Posts').icon(DocumentsIcon),
              S.documentTypeListItem('tags').title('Tags').icon(TagIcon),
            ]),
        ),
      S.listItem()
        .title('Footer Links')
        .icon(LinkIcon)
        .child(S.document().schemaType('footer').documentId('footer')),
    ])
