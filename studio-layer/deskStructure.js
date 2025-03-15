export const myStructure = (S) =>
  S.list()
    .title('Injective Blog')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings Documents')
            .items([
              S.listItem()
                .title('Metadata')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Featured Posts')
                .child(S.document().schemaType('featuredPosts').documentId('featuredPosts')),
              S.documentTypeListItem('tags').title('Tags'),
            ]),
        ),
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['homePage', 'tags', 'featuredPosts', 'siteSettings'].includes(listItem.getId()),
      ),
    ])
