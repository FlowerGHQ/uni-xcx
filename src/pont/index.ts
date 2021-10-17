import { defs as oauthDefs, oauth } from './oauth'

import {
  defs as partnersBBusinessDefs,
  partnersBBusiness
} from './partnersBBusiness'
;(window as any).defs = {
  oauth: oauthDefs,
  partnersBBusiness: partnersBBusinessDefs
}
;(window as any).API = {
  oauth,
  partnersBBusiness
}
