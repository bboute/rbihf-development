import {StructureResolver} from 'sanity/structure'
import {pathwayPages} from '../../content/pathwayPages'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('home-page')),
      S.listItem()
        .title('Talent Pool Page')
        .child(S.document().schemaType('talentPoolPage').documentId('talent-pool-page')),
      S.listItem()
        .title('National Teams Page')
        .child(S.document().schemaType('nationalTeamsPage').documentId('national-teams-page')),
      ...(['talent-pool', 'national-teams'] as const).map((kind) =>
        S.listItem()
          .title(kind === 'talent-pool' ? 'Talent Pool Stage Pages' : 'National Team Detail Pages')
          .child(
            S.list()
              .title(kind === 'talent-pool' ? 'Talent Pool Stages' : 'National Teams')
              .items(
                pathwayPages
                  .filter((page) => page.kind === kind)
                  .map((page) =>
                    S.listItem()
                      .title(page.label)
                      .child(S.document().schemaType('pathwayPage').documentId(page.id)),
                  ),
              ),
          ),
      ),
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.listItem()
                .title('Event Labels')
                .child(S.document().schemaType('eventLabels').documentId('event-labels')),
            ]),
        ),
      S.listItem()
        .title('Announcements')
        .child(S.documentTypeList('announcement').title('Announcements')),
      S.listItem()
        .title('Talent Pool Categories')
        .child(S.documentTypeList('talentPoolCategory').title('Talent Pool Categories')),
      S.listItem()
        .title('Fundamental Categories')
        .child(
          S.documentTypeList('fundamentalCategory')
            .title('Fundamental Categories')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Skill Categories')
        .child(S.documentTypeList('skillCategory').title('Skill Categories')),
      S.listItem().title('Events').child(S.documentTypeList('event').title('Events')),
      S.listItem()
        .title('Talent Pool Documents')
        .child(S.documentTypeList('talentPoolDocument').title('Talent Pool Documents')),
      S.listItem()
        .title('Exhibition Games')
        .child(S.documentTypeList('exhibitionGame').title('Exhibition Games')),
      S.listItem().title('News Posts').child(S.documentTypeList('post').title('News Posts')),
      S.listItem().title('Guides').child(S.documentTypeList('guide').title('Guides')),
      S.listItem().title('Static Pages').child(S.documentTypeList('page').title('Static Pages')),
    ])
