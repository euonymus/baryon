import React from 'react'
import PropTypes from 'prop-types'
import PropertyBox from './property_box'

const Gluons = (props) => {
  const { targetProperties, graphPath } = props

  const propertyList = targetProperties.map((propertyResource, key) => {
    return (
      <PropertyBox key={key} propertyResource={propertyResource} graphPath={graphPath} />
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
  graphPath: PropTypes.string
}
Gluons.defaultProps = {
  graphPath: '',
}

export default Gluons
