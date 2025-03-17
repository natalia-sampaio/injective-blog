import {footerType} from './footerType'
import {homePageType} from './homePageType'
import {postType} from './postType'
import {featuredPostsType} from './settings/featuredPostsType'
import {siteSettings} from './settings/siteSettingsType'
import {tagsType} from './settings/tagsType'
import {youTubeType} from './youtubeType/youTubeType'

export const schemaTypes = [
  postType,
  tagsType,
  homePageType,
  featuredPostsType,
  siteSettings,
  footerType,
  youTubeType,
]
