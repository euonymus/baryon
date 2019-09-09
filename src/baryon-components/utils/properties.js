import { properties } from '../constants/properties'
import { gluon_types } from '../constants/gluon_types'
import { qtype_properties } from '../constants/qtype_properties'
import { property_gtypes } from '../constants/property_gtypes'
import { LANGTYPE_JP_LIKE } from '../constants/langtypes'
import Interaction from './interaction'

class Properties {
  constructor(gluons) {
    this.subject = new Interaction(gluons[0], LANGTYPE_JP_LIKE).subject

    gluons.forEach(interactionRaw => {
      const currentInteraction = new Interaction(interactionRaw, LANGTYPE_JP_LIKE)
      const subject = currentInteraction
      const object = currentInteraction
      console.log()
      console.log(new Interaction(interactionRaw, LANGTYPE_JP_LIKE).gluon.type)
    })
    

    // foreach ($result->getRecords() as $key => $record) {
    //     $active = self::getActiveNode($record);
    //     $passive = self::getPassiveNode($record);
    //     $relation = $record->value('relation');
    // 
    //     $ret['relations'][] = [
    //         'relation' => self::buildRelationshipArr($relation),
    //         'active' => self::buildNodeArr($active),
    //         'passive' => self::buildNodeArr($passive),
    //     ];
    // }


    // console.log(qtype_properties)
    // console.log(properties)
    // console.log(property_gtypes)
    // 
    // console.log(gluon_types)

  }

  relationText() {
  }
}
export default Properties
