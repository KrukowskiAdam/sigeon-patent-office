import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Homepage - singleton document
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Homepage')
        ),
      
      // Divider
      S.divider(),
      
      // Other document types
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      
      S.listItem()
        .title('News')
        .schemaType('news')
        .child(S.documentTypeList('news').title('News Articles')),
      
      S.listItem()
        .title('Team Members')
        .schemaType('teamMember')
        .child(S.documentTypeList('teamMember').title('Team Members')),
    ])