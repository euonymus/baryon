import React from 'react'
import QuarkUtil from './quark'
import GluonUtil from './gluon'
import { LANGTYPE_ENG_LIKE } from '../constants/langtypes'

class Interaction {
  langType = LANGTYPE_ENG_LIKE

  constructor(interactionRaw, langType = null, graphPath = '', onLinkClick = () => {}) {
    this.gluonKey = interactionRaw._fieldLookup.gluon
    this.gluon = new GluonUtil(interactionRaw.get(this.gluonKey), langType)

    this.subjectKey = interactionRaw._fieldLookup.subject
    this.subject = new QuarkUtil(interactionRaw.get(this.subjectKey), langType, graphPath, onLinkClick)

    this.objectKey = interactionRaw._fieldLookup.object
    this.object = new QuarkUtil(interactionRaw.get(this.objectKey), langType, graphPath, onLinkClick)

    if (langType) {
      this.langType = langType
    }

    // These are needed in gluon component
    this.objectName = this.object.getName()
    this.objectImagePath = this.object.properties.image_path
    this.relationText = this.relationTextBuilder()
    this.relationPeriod = this.gluon.period_str


    if (interactionRaw._fieldLookup.second_gluon) {
      const gluon2Key = interactionRaw._fieldLookup.second_gluon
      const object2Key = interactionRaw._fieldLookup.second_object

      const gluon2 = new GluonUtil(interactionRaw.get(gluon2Key), langType)
      const object2 = new QuarkUtil(interactionRaw.get(object2Key), langType, graphPath, onLinkClick)

      const second = {
        gluon: gluon2,
        object: object2,
        objectName: object2.getName(),
        objectImagePath: object2.properties.image_path,
        relationPeriod: gluon2.period_str
      }
      this.seconds = [second]
      this.seconds[0].relationText = this.relationTextBuilder(2)
    }
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
