import React from 'react'
import QuarkUtil from './quark'
import GluonUtil from './gluon'
import { LANGTYPE_ENG_LIKE } from '../constants/langtypes'

class Interaction {
  langType = LANGTYPE_ENG_LIKE

  constructor(interactionRaw, allNodes, langType = null, graphPath = '', onLinkClick = () => {}) {
    const interactionObject = interactionRaw.toObject()

    if (langType) {
      this.langType = langType
    }
    this.subject = new QuarkUtil(interactionObject.subject, langType, graphPath, onLinkClick)
    this.object = new QuarkUtil(interactionObject.object, langType, graphPath, onLinkClick)

    const gluonRaw = interactionObject.gluon
    if (this.isArray(gluonRaw)) {
      const interactionList = gluonRaw.map(interaction => {
        const gluon = new GluonUtil(interaction, langType)
        let subject = null
        let object = null

        if (this.subject.identity.toString() === gluon.start.toString()) {
          subject = this.subject
          object = allNodes[gluon.end.toString()]
        } else if (this.object.identity.toString() === gluon.start.toString()) {
          subject = allNodes[gluon.end.toString()]
          object = this.object
        } else if (this.subject.identity.toString() === gluon.end.toString()) {
          subject = this.subject
          object = allNodes[gluon.start.toString()]
        } else if (this.object.identity.toString() === gluon.end.toString()) {
          subject = allNodes[gluon.start.toString()]
          object = this.object
        }
        return { gluon, subject, object }
      })

      this.gluon = interactionList[0].gluon
      this.object = interactionList[0].object

      if (interactionList.length >= 2) {
        const gluon2 = interactionList[1].gluon
        const object2 = interactionList[1].object

        const second = {
          gluon: gluon2,
          object: object2,
          objectName: object2.getName(),
          objectImagePath: object2.properties.image_path,
          relationPeriod: gluon2.period_str
        }
        this.seconds = [second]
        this.seconds[0].relationText = this.relationTextBuilder(2)
      } else {
        this.seconds = []
      }
    } else {
      const gluon = gluonRaw

      this.gluon = new GluonUtil(gluon, langType)
      this.object = new QuarkUtil(interactionObject.object, langType, graphPath, onLinkClick)
    }

    // These are needed in gluon component
    this.objectName = this.object.getName()
    this.objectImagePath = this.object.properties.image_path
    this.relationText = this.relationTextBuilder()
    this.relationPeriod = this.gluon.period_str
  }

  isArray = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  relationTextBuilder(level = 1) {
    let glue_sentence_before_link = ''
 	  let glue_sentence_after_link = ' '

    let object = this.object
    let gluon = this.gluon
    if (level === 2) {
      object = this.seconds[0].object
      gluon = this.seconds[0].gluon
    }

    if (this.subject.identity.toString() === gluon.start.toString()) {

      glue_sentence_before_link = this.subject.getName()
 	    if (this.langType === LANGTYPE_ENG_LIKE) {
 		    glue_sentence_before_link += ' ' + gluon.getRelation()
 	    } else {
 		    glue_sentence_before_link += 'は'
        glue_sentence_after_link += gluon.getRelation()
 	    }
 	    glue_sentence_before_link += ' '
      if (gluon.properties.suffix) {
 	      glue_sentence_after_link += gluon.properties.suffix
      }

 	  } else if (this.subject.identity.toString() === gluon.end.toString()) {

      glue_sentence_before_link = ''
 	    if (this.langType === LANGTYPE_ENG_LIKE) {
        glue_sentence_after_link += gluon.getRelation() + ' ' + this.subject.getName() + ' '
  	  } else {
  		  glue_sentence_after_link += 'は' + this.subject.getName() + gluon.getRelation()
  	  }
  	  glue_sentence_before_link += ' '
      if (gluon.properties.suffix) {
  	    glue_sentence_after_link += gluon.properties.suffix
      }

 	  } else {
 	    return ''
    }

    return (
      <p className="baryon-strong-interaction">
        {glue_sentence_before_link}
        {object.getLinkPath(object.name)}
        {glue_sentence_after_link}
      </p>
 	  )
  }
}
export default Interaction
