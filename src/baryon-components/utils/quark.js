import Util from './common'
class QuarkUtil {
  constructor(quarkRaw) {
    this.identity = quarkRaw.identity
    this.labels = quarkRaw.labels
    this.properties = quarkRaw.properties
	  let util = new Util()
 	  this.period_str = util.period2str(quarkRaw.properties)
  }
}
export default QuarkUtil
