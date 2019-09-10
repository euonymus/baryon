import _ from 'lodash'
import { properties } from '../constants/properties'
// import { gluon_types } from '../constants/gluon_types'
import { qtype_properties } from '../constants/qtype_properties'
import { property_gtypes } from '../constants/property_gtypes'
import { LANGTYPE_JP_LIKE } from '../constants/langtypes'
import Interaction from './interaction'

class Properties {
  constructor(gluons) {
    this.subject = new Interaction(gluons[0], LANGTYPE_JP_LIKE).subject

    const targetProperties = qtype_properties[this.subject.labels[0]]

    const data = []
    _.forEach(targetProperties, (qtype_property, i) => {
      const property_id = qtype_property.property_id
      const gluonsRelated = this.getGluonTypesRelated(property_id, gluons)
      if (gluonsRelated.length === 0) {
        return true // as to continue
      }
      data.push({
        property: properties[property_id],
        gluonsRelated
      })
    })
    
    gluons.forEach(interactionRaw => {
      const currentInteraction = new Interaction(interactionRaw, LANGTYPE_JP_LIKE)
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
        if ((data.length === 0) ||data.slice(-1)[0].property.caption !== 'others') {
          data.push({
            property: {
              caption: 'others',
              caption_ja: 'その他',
            },
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
    const ret = []
    gluons.forEach(interactionRaw => {
      const currentInteraction = new Interaction(interactionRaw, LANGTYPE_JP_LIKE)
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
