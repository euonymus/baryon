import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './assets/styles/baryon.css'
// Material UI
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

class Gluon extends Component {
  render () {
    const { interaction } = this.props
    const { gluon, object } = interaction
    return (
      <div className="baryon-gluon-body">
        <ListItem>
          <Link to={`/${object.properties.name}`}>
            <ListItemAvatar>
              <Avatar>
                <img className="baryon-gluon-image" src={object.properties.image_path} alt={object.properties.name} />
              </Avatar>
            </ListItemAvatar>
          </Link>
          <ListItemText primary={interaction.relationText} secondary={gluon.period_str} />
        </ListItem>
      </div>
    )
  }
}

Gluon.propTypes = {
  interaction: PropTypes.object.isRequired
}
export default Gluon
