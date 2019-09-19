import React from 'react'
import PropTypes from 'prop-types'
import PropertyBox from './property_box'

const Gluons = (props) => {
  const { targetProperties } = props

  const propertyList = targetProperties.map((propertyResource, key) => {
    return (
      <PropertyBox key={key} propertyResource={propertyResource} />
    )
  })

  return (
    <div className="baryon-properties baryon-grid">
      { propertyList }
    </div>
  )
}

Gluons.propTypes = {
  targetProperties: PropTypes.array.isRequired
}
export default Gluons
