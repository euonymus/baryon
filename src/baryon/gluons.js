import React from 'react'
import PropTypes from 'prop-types'
import PropertyBox from './property-box'

const Gluons = (props) => {
  const { targetProperties, hasSecondLevel } = props

  const propertyList = targetProperties.map((propertyResource, key) => {
    return (
      <PropertyBox key={key} propertyResource={propertyResource} hasSecondLevel={hasSecondLevel} />
    )
  })

  return (
    <div className="baryon-properties baryon-grid">
      { propertyList }
    </div>
  )
}

Gluons.propTypes = {
  targetProperties: PropTypes.array.isRequired,
  hasSecondLevel: PropTypes.bool.isRequired,
}
Gluons.defaultProps = {
  hasSecondLevel: false
}

export default Gluons
