import React from 'react'
import PropTypes from 'prop-types'
import PropertyBox from './property_box'
import Properties from './utils/properties'

const Gluons = (props) => {
  const { gluons } = props

  const targetProperties = new Properties(gluons)
  const propertyList = targetProperties.data.map((propertyResource, key) => {
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
  gluons: PropTypes.array.isRequired
}
export default Gluons
