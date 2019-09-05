import Util from './common'
class GluonUtil {
  constructor(gluonRaw) {
    this.identity = gluonRaw.identity
    this.type = gluonRaw.type
    this.start = gluonRaw.start
    this.end = gluonRaw.end
    this.properties = gluonRaw.properties
 	  let util = new Util()
  	this.period_str = util.period2str(gluonRaw.properties)
  }
}
export default GluonUtil
