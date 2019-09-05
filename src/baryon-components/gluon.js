import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Gluon extends Component {
  render () {
    const { gluon } = this.props
    console.log(gluon)

    return (
      <div></div>
    )

  }
}

Gluon.propTypes = {
  gluon: PropTypes.object.isRequired
}
export default Gluon
