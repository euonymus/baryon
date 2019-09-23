import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import './assets/styles/baryon.css'
import SecondGluons from './second-gluons'
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
  const { interaction, hasSecondLevel } = props
  const { objectName, objectImagePath, relationText, relationPeriod, seconds } = interaction
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
        { (hasSecondLevel && (seconds.length !== 0)) && (
          <Fragment>
            <ListItem>
              <h3>Secondary Relationships</h3>
            </ListItem>
            <ListItem>
              <SecondGluons gluons={seconds} />
            </ListItem>
          </Fragment>
        )}
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
  }),
  hasSecondLevel: PropTypes.bool.isRequired,
}
Gluon.defaultProps = {
  hasSecondLevel: false
}

export default Gluon
