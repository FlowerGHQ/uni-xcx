import {
  defs as partnersSBusinessDefs,
  partnersSBusiness
} from '@/pont/partnersSBusiness'

import { defs as oauthDefs, oauth } from '@/pont/oauth'

export const defs = {
  partnersSBusiness: partnersSBusinessDefs,
  oauth: oauthDefs
}
export const API = {
  partnersSBusiness,
  oauth
}
