import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Gluon from './gluon'

class Gluons extends Component {
  render () {
    const { gluons } = this.props
    console.log(gluons)
    return gluons.map(gluon => {
      console.log(gluon._fieldLookup.gluon)
      console.log(gluon._fields[gluon._fieldLookup.gluon].identity)
      return (
        <Gluon key={gluon._fields[gluon._fieldLookup.gluon].identity} gluon={gluon} />
      )
    })
  }
}

Gluons.propTypes = {
  gluons: PropTypes.array.isRequired
}
export default Gluons
