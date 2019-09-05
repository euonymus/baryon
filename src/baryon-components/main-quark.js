import React, { Component } from 'react'
import PropTypes from 'prop-types'
// utils
import QuarkUtil from './utils/quark'
// Material UI
import LinkIcon from '@material-ui/icons/Link'

class MainQuark extends Component {
  render () {
	  const subject = new QuarkUtil(this.props.subject)
	  return (
      <div>
        { subject.properties.image_path && (
          <div>
            <img src={subject.properties.image_path} alt={subject.properties.name} />
          </div>
        )}
        <div>
          <h1>{subject.properties.name}
            { subject.properties.url && (
                <sub>
                  <a href={subject.properties.url} target="_blank" rel="noopener noreferrer"><LinkIcon /></a>
                </sub>
            )}
          </h1>
          <p>{subject.period_str}</p>
          <p>{subject.properties.description}</p>

          { subject.properties.affiliate && (
 	            <p>
                <a href={subject.properties.affiliate} target="_blank" rel="noopener noreferrer" >Buy Now</a>
              </p>
          )}
        </div>
      </div>
	  )
  }
}

MainQuark.propTypes = {
  subject: PropTypes.object.isRequired
}
export default MainQuark
