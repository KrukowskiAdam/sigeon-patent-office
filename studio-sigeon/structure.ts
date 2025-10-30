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
      
      // Navigation - singleton document
      S.listItem()
        .title('Navigation')
        .id('navigation')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('main-navigation')
            .title('Main Navigation')
        ),
      
      // News Page Settings - singleton document
      S.listItem()
        .title('News Page Settings')
        .id('newsPage')
        .child(
          S.document()
            .schemaType('newsPage')
            .documentId('news-page-settings')
            .title('News Page Settings')
        ),
      
      // Team Page Settings - singleton document
      S.listItem()
        .title('Team Page Settings')
        .id('teamPage')
        .child(
          S.document()
            .schemaType('teamPage')
            .documentId('team-page-settings')
            .title('Team Page Settings')
        ),
      
      // Footer - singleton document
      S.listItem()
        .title('Footer')
        .id('footer')
        .child(
          S.document()
            .schemaType('footer')
            .documentId('footer-settings')
            .title('Footer Settings')
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