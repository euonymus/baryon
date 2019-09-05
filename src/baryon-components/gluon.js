import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './assets/styles/baryon.css'

class Gluon extends Component {
  render () {
    const { interaction } = this.props
    const { gluon, object } = interaction
    return (
      <div className="baryon-gluon-body">
        <Link to={`/${object.properties.name}`}>
          <img className="baryon-gluon-image" src={object.properties.image_path} alt={object.properties.name} />
        </Link>
        <div className="baryon-interaction-body">
          {interaction.relationText}
          <p>{gluon.period_str}</p>
        </div>
      </div>
    )
  }
}

Gluon.propTypes = {
  interaction: PropTypes.object.isRequired
}
export default Gluon
