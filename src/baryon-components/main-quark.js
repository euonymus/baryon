import React, { Component } from 'react';
import PropTypes from 'prop-types'
// import { FormattedMessage } from 'react-intl';
// utils
// import Util from '../utils/common';

class MainQuark extends Component {
  render () {
    const { subject } = this.props;
    if (!subject) {
	    return <div>Loading...</div>;
    }
	  // let util = new Util();
    // 	  const period_str = util.period2str(subject.properties);

	  return (
      <div>
        { subject.properties.image_path && (
          <div>
            <img src={subject.properties.image_path} alt={subject.properties.name} />
          </div>
        )}
        <div>
          <h1>{subject.properties.name}
            {(() => { if (subject.properties.url) return (
               <sub>
                 <a href={subject.properties.url} target="_blank" rel="noopener noreferrer"> </a>
               </sub>
 	          );})()}
          </h1>
        </div>
      </div>
	  );
  }
}

MainQuark.propTypes = {
  subject: PropTypes.object.isRequired
}
export default MainQuark
// 
//   <p>{period_str}</p>
//   <p>{subject.properties.description}</p>
// 
//   {(() => { if (subject.properties.affiliate) return (
// 		         <p><a href={subject.properties.affiliate} target="_blank" rel="noopener noreferrer" >
//        <FormattedMessage id="button_buy" defaultMessage={`Buy Now`} />
//    		       </a></p>
// 	        );})()}
// 
// </div>
