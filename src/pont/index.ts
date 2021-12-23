import { defs as oauthDefs, oauth } from './oauth'

import {
  defs as partnersSBusinessDefs,
  partnersSBusiness
} from './partnersSBusiness'
;(window as any).defs = {
  oauth: oauthDefs,
  partnersSBusiness: partnersSBusinessDefs
}
;(window as any).API = {
  oauth,
  partnersSBusiness
}
