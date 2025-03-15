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
              S.listItem().title('Tags').child(S.document().schemaType('tags').documentId('tags')),
            ]),
        ),
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['homePage', 'featuredPosts', 'tags', 'siteSettings'].includes(listItem.getId()),
      ),
    ])
