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
  }

  relationTextBuilder() {
     let glue_sentence_before_link = ''
 	   let glue_sentence_after_link = ' '

     if (this.subject.identity.toString() === this.gluon.start.toString()) {

       glue_sentence_before_link = this.subject.getName()
 	     if (this.langType === LANGTYPE_ENG_LIKE) {
 		     glue_sentence_before_link += ' ' + this.gluon.getRelation()
 	     } else {
 		     glue_sentence_before_link += 'は'
         glue_sentence_after_link += this.gluon.getRelation()
 	     }
 	     glue_sentence_before_link += ' '
       if (this.gluon.properties.suffix) {
 	       glue_sentence_after_link += this.gluon.properties.suffix
       }

 	   } else if (this.subject.identity.toString() === this.gluon.end.toString()) {

       glue_sentence_before_link = ''
 	     if (this.langType === LANGTYPE_ENG_LIKE) {
         glue_sentence_after_link += this.gluon.getRelation() + ' ' + this.subject.getName() + ' '
  	   } else {
  		   glue_sentence_after_link += 'は' + this.subject.getName() + this.gluon.getRelation()
  	   }
  	   glue_sentence_before_link += ' '
       if (this.gluon.properties.suffix) {
  	     glue_sentence_after_link += this.gluon.properties.suffix
       }

 	   } else {
 	     return ''
     }

     return (
       <p className="baryon-strong-interaction">
         {glue_sentence_before_link}
         {this.object.getLinkPath(this.object.name)}
         {glue_sentence_after_link}
       </p>
 	   )
   }
}
export default Interaction
