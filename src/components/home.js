// react
import React from 'react'
import PropTypes from 'prop-types'
import NameForm from '../components/name-form'
import Baryon from '../baryon'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function Home(props) {
  const classes = useStyles();

  const { quark_name, hasSecondLevel, onButtonClick } = props
  const uri = process.env.REACT_APP_NEO4J_URI
  const user = process.env.REACT_APP_NEO4J_USER
  const password = process.env.REACT_APP_NEO4J_PASSWORD
  const graphPath = process.env.REACT_APP_GRAPH_PATH

  let firstColor = 'primary'
  let secondColor = null
  if (hasSecondLevel) {
    firstColor = null
    secondColor = 'primary'
  }

	return (
    <div>
      <div>
        <Button variant="contained" color={firstColor} className={classes.button} onClick={() => onButtonClick(false)}>
          First level
        </Button>
        <Button variant="contained" color={secondColor} className={classes.button} onClick={() => onButtonClick(true)}>
          Second level
        </Button>
      </div>

      {
        quark_name ? (
          <Baryon quark_name={quark_name} connection={{ uri, user, password }} graphPath={graphPath} hasSecondLevel={hasSecondLevel} />
        ) : (
          <NameForm />
        )
      }
    </div>
	)
}

Home.propTypes = {
  quark_name: PropTypes.string.isRequired,
  hasSecondLevel: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
}
Home.defaultProps = {
  hasSecondLevel: false
}
export default Home
