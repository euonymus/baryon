import React from 'react'
import PropTypes from 'prop-types'
import './assets/styles/baryon.css'
// Material UI
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles({
  card: {
    margin: '20px',
    display: 'block',
  },
  avatarListItem: {
    width: 150,
  },
  avatar: {
    width: 130,
    height: 130,
  },
})

const Gluon = (props) => {
  const { interaction } = props
  const { objectName, objectImagePath, relationText, relationPeriod } = interaction
  const classes = useStyles()
  const avatar = (
    <ListItemAvatar className={classes.avatarListItem} >
      <Avatar className={classes.avatar} >
        <img className="baryon-gluon-image" src={objectImagePath} alt={objectName} />
      </Avatar>
    </ListItemAvatar>
  )
  return (
    <div className="baryon-gluon-body">
      <Card className={classes.card}>
        <ListItem>
          {interaction.object.getLinkPath(avatar)}
          <ListItemText primary={relationText} secondary={relationPeriod} />
        </ListItem>
      </Card>
    </div>
  )
}

Gluon.propTypes = {
  interaction: PropTypes.shape({
    objectName: PropTypes.string.isRequired,
    objectImagePath: PropTypes.string.isRequired,
    relationText: PropTypes.object.isRequired,
    relationPeriod: PropTypes.string.isRequired,
  })
}

export default Gluon
