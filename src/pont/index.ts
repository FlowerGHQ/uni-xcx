import {
  defs as partnersSBusinessDefs,
  partnersSBusiness
} from './partnersSBusiness'

import { defs as oauthDefs, oauth } from './oauth'

;(window as any).defs = {
  partnersSBusiness: partnersSBusinessDefs,
  oauth: oauthDefs
}
;(window as any).API = {
  partnersSBusiness,
  oauth
}
