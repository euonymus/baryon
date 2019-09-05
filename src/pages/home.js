// react
import React, { Component } from 'react'
import NameForm from '../components/name-form'
import Baryon from '../components/baryon'

class Home extends Component {
  render () {
	  return (
      <div>
        {
          this.props.match.params.name ? (
            <Baryon quark_name={this.props.match.params.name} />
          ) : (
            <NameForm />
          )
        }
      </div>
	  )
  }
}
export default Home
