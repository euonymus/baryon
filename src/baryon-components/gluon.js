import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
  const { gluon, object } = interaction
  const classes = useStyles()
  return (
    <div className="baryon-gluon-body">
      <Card className={classes.card}>
        <ListItem>
          <Link to={`/${object.properties.name}`}>
            <ListItemAvatar className={classes.avatarListItem} >
              <Avatar className={classes.avatar} >
                <img className="baryon-gluon-image" src={object.properties.image_path} alt={object.getName()} />
              </Avatar>
            </ListItemAvatar>
          </Link>
          <ListItemText primary={interaction.relationText} secondary={gluon.period_str} />
        </ListItem>
      </Card>
    </div>
  )
}

Gluon.propTypes = {
  interaction: PropTypes.object.isRequired
}
export default Gluon
