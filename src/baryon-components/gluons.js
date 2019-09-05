import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Gluon from './gluon'
import Interaction from './utils/interaction'
import { LANGTYPE_JP_LIKE } from './constants/langtypes'

class Gluons extends Component {
  render () {
    const { gluons } = this.props
    return gluons.map(interactionRaw => {
      const interaction = new Interaction(interactionRaw, LANGTYPE_JP_LIKE)
      return (
        <Gluon key={interaction.gluon.identity} interaction={interaction} />
      )
    })
  }
}

Gluons.propTypes = {
  gluons: PropTypes.array.isRequired
}
export default Gluons
