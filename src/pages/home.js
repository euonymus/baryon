// react
import React, { Component } from 'react'
import NameForm from '../components/name-form'
import Baryon from '../baryon'

class Home extends Component {
  render () {
    const uri = process.env.REACT_APP_NEO4J_URI
    const user = process.env.REACT_APP_NEO4J_USER
    const password = process.env.REACT_APP_NEO4J_PASSWORD
    const graphPath = process.env.REACT_APP_GRAPH_PATH
	  return (
      <div>
        {
          this.props.match.params.name ? (
            <Baryon quark_name={this.props.match.params.name} connection={{ uri, user, password }} graphPath={graphPath} hasSecondLevel={false} />
          ) : (
            <NameForm />
          )
        }
      </div>
	  )
  }
}
export default Home
