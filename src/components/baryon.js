// react
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Baryon extends Component {
  render () {
    const { quark_name } = this.props
	  return (
      <div>
        <h1>{quark_name}</h1>
      </div>
	  )
  }
}
Baryon.propTypes = {
  quark_name: PropTypes.string.isRequired
}
export default Baryon
