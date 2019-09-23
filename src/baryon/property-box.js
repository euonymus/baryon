import React from 'react'
import PropTypes from 'prop-types'
import Gluon from './gluon'
import './assets/styles/baryon.css'
// Material UI
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'

const useStyles = makeStyles({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // backgroundColor: '#e6e6f5'
    backgroundColor: '#666666'
  },
})

const PropertyBox = (props) => {
  const { propertyResource, hasSecondLevel } = props
  const classes = useStyles()
  const gluonsList = propertyResource.gluonsRelated.map((interaction, key) => {
    return (
      <Gluon key={key} interaction={interaction} hasSecondLevel={hasSecondLevel} />
    )
  })
  return (
    <div>
      <h2>{propertyResource.property}</h2>
      <Card className={classes.card}>
        <List className={classes.root}>
          {gluonsList}
        </List>
      </Card>
    </div>
  )
}

PropertyBox.propTypes = {
  propertyResource: PropTypes.shape({
    property: PropTypes.string.isRequired,
    gluonsRelated: PropTypes.array.isRequired,
  }),
  hasSecondLevel: PropTypes.bool.isRequired,
}
PropertyBox.defaultProps = {
  hasSecondLevel: false
}

export default PropertyBox
