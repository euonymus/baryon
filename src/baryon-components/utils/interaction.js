import React from 'react'
import { Link } from 'react-router-dom'

import QuarkUtil from './quark'
import GluonUtil from './gluon'
import { LANGTYPE_ENG_LIKE } from '../constants/langtypes'

class Interaction {
  langType = LANGTYPE_ENG_LIKE
  constructor(interactionRaw, langType = null) {
    this.gluonKey = interactionRaw._fieldLookup.gluon
    this.gluon = new GluonUtil(interactionRaw.get(this.gluonKey))

    this.subjectKey = interactionRaw._fieldLookup.subject
    this.subject = new QuarkUtil(interactionRaw.get(this.subjectKey))

    this.objectKey = interactionRaw._fieldLookup.object
    this.object = new QuarkUtil(interactionRaw.get(this.objectKey))

    if (langType) {
      this.langType = langType
    }
    this.relationText = this.relationText(this.langType)
  }

   relationText(langType) {
     let glue_sentence_before_link = ''
 	   let glue_sentence_after_link = ' '

     if (this.subject.identity.toString() === this.gluon.start.toString()) {

       glue_sentence_before_link = this.subject.properties.name
 	     if (langType === LANGTYPE_ENG_LIKE) {
 		     glue_sentence_before_link += ' ' + this.gluon.properties.relation
 	     } else {
 		     glue_sentence_before_link += 'は'
 		     glue_sentence_after_link += this.gluon.properties.relation
 	     }
 	     glue_sentence_before_link += ' '
       if (this.gluon.properties.suffix) {
 	       glue_sentence_after_link += this.gluon.properties.suffix
       }

 	   } else if (this.subject.identity.toString() === this.gluon.end.toString()) {

       glue_sentence_before_link = ''
 	     if (langType === LANGTYPE_ENG_LIKE) {
  		   glue_sentence_after_link += this.gluon.properties.relation + ' ' + this.subject.properties.name + ' '
  	   } else {
  		   glue_sentence_after_link += 'は' + this.subject.properties.name + this.gluon.properties.relation
  	   }
  	   glue_sentence_before_link += ' '
       if (this.gluon.properties.suffix) {
  	     glue_sentence_after_link += this.gluon.properties.suffix
       }

 	   } else {
 	     return '';
     }

     return (
       <p className="baryon-strong-interaction">
         {glue_sentence_before_link}
         <Link to={`/${this.object.properties.name}`}>{this.object.properties.name}</Link>
         {glue_sentence_after_link}
       </p>
 	   )
   }
}
export default Interaction
