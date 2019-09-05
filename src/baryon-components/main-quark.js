import React from 'react'
import PropTypes from 'prop-types'
// utils
import QuarkUtil from './utils/quark'
// Material UI
import LinkIcon from '@material-ui/icons/Link'

import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 300,
  },
});

const MainQuark = (props) => {
	const subject = new QuarkUtil(props.subject)
  const classes = useStyles();
	return (
    <div className="baryon-subject">
      <Card className={classes.card}>
        <CardActionArea>
          { subject.properties.image_path && (
              <CardMedia
                className={classes.media}
                image={subject.properties.image_path}
                title={subject.properties.name}
              />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {subject.properties.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {subject.period_str}<br />
              {subject.properties.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          { subject.properties.url && (
              <Button size="small" color="primary">
                <a href={subject.properties.url} target="_blank" rel="noopener noreferrer"><LinkIcon /></a>
              </Button>
          )}
          { subject.properties.affiliate && (
              <Button size="small" color="primary">
                <a href={subject.properties.affiliate} target="_blank" rel="noopener noreferrer" >Buy Now</a>
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
