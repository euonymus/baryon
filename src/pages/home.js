// react
import React, { Component } from 'react'
import NameForm from '../components/name-form'

class Home extends Component {
  render () {
	  return (
      <div>
        {
          this.props.match.params.name ? (
            <p>Here {this.props.match.params.name}</p>
          ) : (
            <NameForm />
          )
        }
      </div>
	  )
  }
}
export default Home
