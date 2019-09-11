import Util from './common'
import { gluon_types } from '../constants/gluon_types'
import { LANGTYPE_ENG_LIKE, LANGTYPE_JP_LIKE } from '../constants/langtypes'
class GluonUtil {
  constructor(gluonRaw, langType = LANGTYPE_ENG_LIKE) {
    this.langType = langType
    this.identity = gluonRaw.identity
    this.type = gluonRaw.type
    this.start = gluonRaw.start
    this.end = gluonRaw.end
    this.properties = gluonRaw.properties
 	  let util = new Util()
  	this.period_str = util.period2str(gluonRaw.properties)
  }

  getRelation = () => {
    let relation = 'has relation to'
    if (gluon_types[this.type]) {
      relation = gluon_types[this.type].caption
    }
    if (this.langType === LANGTYPE_JP_LIKE) {
      return this.properties.relation ? this.properties.relation : relation
    } else {
      // return this.type ? this.type.replace(/_/g, ' ').toLowerCase(): this.properties.relation
      return this.type ? relation: this.properties.relation
    }
  }
}
export default GluonUtil
