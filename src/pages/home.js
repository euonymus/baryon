// react
import React, { Component } from 'react';

class Home extends Component {
  render () {
	  return (
      <div>
        {
          this.props.match.params.name ? (
            <p>Here {this.props.match.params.name}</p>
          ) : (
            <p>Please select a quark</p>
          )
        }
      </div>
	  )
  }
}
export default Home
