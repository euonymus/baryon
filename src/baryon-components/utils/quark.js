import React from 'react'
import { Link } from 'react-router-dom'
import Util from './common'
import { LANGTYPE_ENG_LIKE, LANGTYPE_JP_LIKE } from '../constants/langtypes'
class QuarkUtil {
  constructor(quarkRaw, langType = LANGTYPE_ENG_LIKE) {
    this.langType = langType

    this.identity = quarkRaw.identity
    this.labels = quarkRaw.labels
    this.properties = quarkRaw.properties
	  let util = new Util()

    // These are needed in main-quark component
 	  this.name = this.getName()
 	  this.description = this.getDescription()
 	  this.image_path = this.properties.image_path
 	  this.period_str = util.period2str(quarkRaw.properties)
 	  this.url = this.properties.url
 	  this.affiliate = this.properties.affiliate
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
  getLinkPath = () => {
    let url = window.location.href
    let arr = url.split("/");
    const scheme = arr[0]
    const domainString = arr[2]

    let prefix = ''
    if ((this.langType === LANGTYPE_JP_LIKE) && (!this.properties.name || this.properties.name === 'NULL')) {
      prefix = `${scheme}//${domainString.split('.')[1]}`
    } else if ((this.langType === LANGTYPE_ENG_LIKE) && (!this.properties.en_name || this.properties.en_name === 'NULL')) {
      prefix = `${scheme}//ja.${domainString}`
    } else {
      return (
        <Link to={`/${this.getName()}`}>{this.getName()}</Link>
      )
    }
    return (
        <a href={`${prefix}/${this.getName()}`}>{this.getName()}</a>
    )
  }
}
export default QuarkUtil
