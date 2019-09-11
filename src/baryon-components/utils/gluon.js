import Util from './common'
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
    console.log(this)
    if (this.langType === LANGTYPE_JP_LIKE) {
      return this.properties.relation ? this.properties.relation : this.type
    } else {
      return this.type ? this.type.replace('_', ' ').toLowerCase(): this.properties.relation
    }
  }
}
export default GluonUtil
