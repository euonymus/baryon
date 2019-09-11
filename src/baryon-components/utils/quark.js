import Util from './common'
import { LANGTYPE_ENG_LIKE, LANGTYPE_JP_LIKE } from '../constants/langtypes'
class QuarkUtil {
  constructor(quarkRaw, langType = LANGTYPE_ENG_LIKE) {
    this.langType = langType

    this.identity = quarkRaw.identity
    this.labels = quarkRaw.labels
    this.properties = quarkRaw.properties
	  let util = new Util()
 	  this.period_str = util.period2str(quarkRaw.properties)
  }

  getByLang = (field) => {
    if (this.langType === LANGTYPE_JP_LIKE) {
      return this.properties[field] ? this.properties[field] : this.properties[`en_${field}`]
    } else {
      return this.properties[`en_${field}`] && (this.properties[`en_${field}`] !== "NULL") ?
             this.properties[`en_${field}`] : this.properties[field]
    }
  }
  getName = () => {
    return this.getByLang('name')
  }
  getDescription = () => {
    return this.getByLang('description')
  }
}
export default QuarkUtil
