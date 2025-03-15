export const myStructure = (S) =>
  S.list()
    .title('Injective Blog')
    .items([
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      ...S.documentTypeListItems().filter((listItem) => !['homePage'].includes(listItem.getId())),
    ])
