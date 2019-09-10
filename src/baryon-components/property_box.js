import React from 'react'
import PropTypes from 'prop-types'
import Gluon from './gluon'
// import { Link } from 'react-router-dom'
import './assets/styles/baryon.css'
// Material UI
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List'

const useStyles = makeStyles({
  root: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#f5e6e6'
  },
})

const PropertyBox = (props) => {
  const { propertyResource } = props
  const classes = useStyles()
  console.log()
  const gluonsList = propertyResource.gluonsRelated.map((interaction, key) => {
    return (
      <Gluon key={key} interaction={interaction} />
    )
  })
  return (
    <div>
      <h3>{propertyResource.property.caption_ja}</h3>
      <Card className={classes.card}>
        <List className={classes.root}>
          {gluonsList}
        </List>
      </Card>
    </div>
  )
}

PropertyBox.propTypes = {
  propertyResource: PropTypes.object.isRequired
}
export default PropertyBox
