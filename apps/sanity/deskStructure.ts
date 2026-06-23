import {StructureResolver} from 'sanity/structure'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('home-page')),
      S.listItem()
        .title('Announcements')
        .child(S.documentTypeList('announcement').title('Announcements')),
      S.listItem()
        .title('Talent Pool Categories')
        .child(S.documentTypeList('talentPoolCategory').title('Talent Pool Categories')),
      S.listItem()
        .title('Fundamental Categories')
        .child(S.documentTypeList('fundamentalCategory').title('Fundamental Categories')),
      S.listItem()
        .title('Skill Categories')
        .child(S.documentTypeList('skillCategory').title('Skill Categories')),
      S.listItem().title('Events').child(S.documentTypeList('event').title('Events')),
      S.listItem()
        .title('Exhibition Games')
        .child(S.documentTypeList('exhibitionGame').title('Exhibition Games')),
      S.listItem().title('News Posts').child(S.documentTypeList('post').title('News Posts')),
      S.listItem().title('Guides').child(S.documentTypeList('guide').title('Guides')),
      S.listItem().title('Static Pages').child(S.documentTypeList('page').title('Static Pages')),
    ])
