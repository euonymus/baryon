import React from 'react'
import PropTypes from 'prop-types'
import Gluon from './gluon'
import Interaction from './utils/interaction'
import { LANGTYPE_JP_LIKE } from './constants/langtypes'
// Material UI
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: '#f5e6e6'
  },
}))

const Gluons = (props) => {
  const classes = useStyles()
  const { gluons } = props

  console.log(new Interaction(gluons[0], LANGTYPE_JP_LIKE).subject.labels[0])
  gluons.forEach(interactionRaw => {
    console.log(new Interaction(interactionRaw, LANGTYPE_JP_LIKE).gluon.type)
  })

  const gluonsList = gluons.map(interactionRaw => {
    const interaction = new Interaction(interactionRaw, LANGTYPE_JP_LIKE)
    return (
      <Gluon key={interaction.gluon.identity} interaction={interaction} />
    )
  })

  return (
    <div className="baryon-gluons baryon-grid">
      <Card className={classes.card}>
        <List className={classes.root}>
          { gluonsList }
        </List>
      </Card>
    </div>
  )
}

Gluons.propTypes = {
  gluons: PropTypes.array.isRequired
}
export default Gluons
