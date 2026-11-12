import {guide} from './guide'
import {post} from './post'
import {page} from './page'
import {talentPoolCategory} from './talentPoolCategory'
import {fundamentalCategory} from './fundamentalCategory'
import {event} from './event'
import {exhibitionGame} from './exhibitionGame'
import {homePage} from './homePage'
import {announcement} from './announcement'
import {skillCategory} from './skillCategory'
import {talentPoolDocument} from './talentPoolDocument'
import {talentPoolPage, nationalTeamsPage} from './hubPage'
import {eventLabels} from './eventLabels'
import {pathwayPage} from './pathwayPage'
import {contentSectionTypes} from './contentSections'

export const schemaTypes = [
  ...contentSectionTypes,
  guide,
  post,
  page,
  talentPoolCategory,
  fundamentalCategory,
  event,
  exhibitionGame,
  homePage,
  announcement,
  skillCategory,
  talentPoolDocument,
  talentPoolPage,
  nationalTeamsPage,
  eventLabels,
  pathwayPage,
]
