// react
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Baryon extends Component {
  state = {
    quark_name: null,
    subject: null,
    gluons: []
  }

  componentDidMount() {
    const neo4j = require('neo4j-driver').v1
    
    const uri = process.env.REACT_APP_NEO4J_URI
    const user = process.env.REACT_APP_NEO4J_USER
    const password = process.env.REACT_APP_NEO4J_PASSWORD
    
    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    this.readGraph(this.props.quark_name)
  }

  componentWillUnmount() {
    // on application exit:
    if (this.driver) {
      this.driver.close()
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.quark_name !== this.props.quark_name) {
      this.readGraph(prevProps.quark_name)
    }
  }

  readGraph(name) {
    const session = this.driver.session()
    const resultPromise = session.run(
      'MATCH (subject {name: $name})-[gluon]-(object) RETURN subject, gluon, object ORDER BY (CASE gluon.start WHEN null THEN {} ELSE gluon.start END) DESC, (CASE object.start WHEN null THEN {} ELSE object.start END) DESC',
      {name}
    )
    resultPromise.then(result => {
      session.close()
      const gluons = result.records
      const singleRecord = gluons[0]
      const subject = singleRecord.get(0)
      this.setState({subject})
      this.setState({gluons})
    })
  }

  render () {
    console.log(this.state.subject)
    console.log(this.state.gluons)
    const { quark_name } = this.props
	  return (
      <div>
        <h1>{quark_name}</h1>
      </div>
	  )
  }
}
Baryon.propTypes = {
  quark_name: PropTypes.string.isRequired
}
export default Baryon
