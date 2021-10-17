import {
  defs as partnersBBusinessDefs,
  partnersBBusiness
} from '@/pont/partnersBBusiness'

import { defs as oauthDefs, oauth } from '@/pont/oauth'

export const defs = {
  partnersBBusiness: partnersBBusinessDefs,
  oauth: oauthDefs
}
export const API = {
  partnersBBusiness,
  oauth
}
