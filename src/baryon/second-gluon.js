import React from 'react'
import PropTypes from 'prop-types'
import './assets/styles/baryon.css'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

// Material UI
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    // color: theme.palette.primary.light,
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  imgFullHeight: {
    height: '100px',
    width: '150px',
    objectFit: 'cover'
  }
}));

const SecondGluon = (props) => {
  const classes = useStyles();

  const { gluon } = props
  const actionIcon = (
    <IconButton aria-label={`star ${gluon.objectName}`}>
      <OpenInBrowserIcon className={classes.title} />
    </IconButton>
  )
  return (
    <GridListTile classes={{imgFullHeight: classes.imgFullHeight}}>
      <img src={gluon.objectImagePath} alt={gluon.objectName}/>
      <GridListTileBar
        title={gluon.objectName}
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
        actionIcon={gluon.object.getLinkPath(actionIcon)}
      />
    </GridListTile>
  )
}

SecondGluon.propTypes = {
  gluon: PropTypes.object.isRequired,
}

export default SecondGluon
