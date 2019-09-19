import _ from 'lodash'
import { properties } from '../constants/properties'
// import { gluon_types } from '../constants/gluon_types'
import { qtype_properties } from '../constants/qtype_properties'
import { property_gtypes } from '../constants/property_gtypes'
import { LANGTYPE_ENG_LIKE, LANGTYPE_JP_LIKE } from '../constants/langtypes'
import Interaction from './interaction'

class Properties {
  constructor(gluons, langType = LANGTYPE_ENG_LIKE) {
    this.langType = langType
    this.subject = new Interaction(gluons[0], langType).subject

    const targetProperties = qtype_properties[this.subject.labels[0]]

    const data = []
    _.forEach(targetProperties, (qtype_property, i) => {
      const property_id = qtype_property.property_id
      const gluonsRelated = this.getGluonTypesRelated(property_id, gluons)
      if (gluonsRelated.length === 0) {
        return true // as to continue
      }
      let property = properties[property_id].caption
      if (langType === LANGTYPE_JP_LIKE) {
        property = properties[property_id].caption_ja
      }
      data.push({
        property,
        gluonsRelated
      })
    })
    
    let property = 'others'
    if (langType === LANGTYPE_JP_LIKE) {
      property = 'その他'
    }
    gluons.forEach(interactionRaw => {
      const currentInteraction = new Interaction(interactionRaw, langType)
      let notInArray = true
      data.forEach(listedProperty => {
        if (listedProperty.gluonsRelated.length === 0) {
          return true // as to continue
        }
        listedProperty.gluonsRelated.forEach(gluonRelated => {
          if (gluonRelated.gluon.properties.id === currentInteraction.gluon.properties.id) {
            notInArray = false
            // break
          }
        })
        // if (!notInArray) break
      })
      if (notInArray) {
        // Add others record when the first other-interection hits
        if ((data.length === 0) || data.slice(-1)[0].property !== property) {
          data.push({
            property,
            gluonsRelated: []
          })
        }
        data.slice(-1)[0].gluonsRelated.push(currentInteraction)
      }
    })
    this.data = data
  }

  getGluonTypesRelated(property_id, gluons) {
    const targetPropertyGtypes = property_gtypes[property_id]
    if (!targetPropertyGtypes) {
      return []
    }
    const ret = []
    gluons.forEach(interactionRaw => {
      const currentInteraction = new Interaction(interactionRaw, this.langType)
      if (currentInteraction.gluon.type === 'HAS_RELATION_TO') {
        return true // as to continue
      }
      targetPropertyGtypes.forEach(targetPropertyGtype => {
        if (currentInteraction.gluon.type === targetPropertyGtype.gluon_type) {
          if (targetPropertyGtype.direction === 0) {
            ret.push(currentInteraction)
          } else if ((targetPropertyGtype.direction === 1) &&
                     (this.subject.identity.toString() === currentInteraction.gluon.start.toString()) ) {
            ret.push(currentInteraction)
          } else if ((targetPropertyGtype.direction === 2) &&
                     (this.subject.identity.toString() === currentInteraction.gluon.end.toString()) ) {
            ret.push(currentInteraction)
          }
        }
      })
    })
    return ret
  }
}
export default Properties
