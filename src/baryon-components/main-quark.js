import React from 'react'
import PropTypes from 'prop-types'
// Material UI
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import LinkIcon from '@material-ui/icons/Link'

const useStyles = makeStyles({
  media: {
    height: 300,
    backgroundPosition: '50% 0%',
  },
})

const MainQuark = (props) => {
  const { subject } = props
  const classes = useStyles()
	return (
    <div className="baryon-subject baryon-grid">
      <Card className={classes.card}>
        <CardActionArea>
          { subject.image_path && (
              <CardMedia
                className={classes.media}
                image={subject.image_path}
                title={subject.name}
              />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {subject.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {subject.period_str}<br />
              {subject.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          { subject.url && (
              <Button size="small" color="primary">
                <a href={subject.url} target="_blank" rel="noopener noreferrer"><LinkIcon /></a>
              </Button>
          )}
          { subject.affiliate && (
              <Button size="small" color="primary">
                <a href={subject.affiliate} target="_blank" rel="noopener noreferrer" >Buy Now</a>
              </Button>
          )}
        </CardActions>
      </Card>
    </div>
  )
}

MainQuark.propTypes = {
  subject: PropTypes.object.isRequired
}
export default MainQuark
