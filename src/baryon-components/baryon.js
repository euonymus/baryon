// react
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MainQuark from './main-quark'
import Gluons from './gluons'
import { LANG_SUBDOMAIN_JP_LIKE } from './constants/lang-subdomain'
import { LANGTYPE_ENG_LIKE, LANGTYPE_JP_LIKE } from './constants/langtypes'

class Baryon extends Component {
  state = {
    langType: LANGTYPE_ENG_LIKE,
    isNoData: false,  // NOTE: Default has to be false, so user will see Loading..., when loading.
    quark_name: null,
    subject: null,
    gluons: []
  }

  componentDidMount() {
    const domainString = document.domain;
    const domainFirstPart = domainString.split('.')[0]
    if (domainFirstPart === LANG_SUBDOMAIN_JP_LIKE) {
      this.setState({langType: LANGTYPE_JP_LIKE})
    }

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
      this.readGraph(this.props.quark_name)
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

      let gluons = result.records
      const singleRecord = gluons[0]

      let subject = null
      let isNoData = true

      if (singleRecord) {
        subject = singleRecord.get(0)
        isNoData = false
      } else {
        gluons = []
      }
      this.setState({subject, gluons, isNoData})
    })
  }

  render () {
    const { langType, subject, gluons, isNoData } = this.state
    const { quark_name } = this.props

    if (!subject || (gluons.length === 0)) {
      let message = 'Loading...'
      if (isNoData) {
        message = 'Not Found'
      }
	    return (
        <div>
          <h1>{quark_name}</h1>
          <p>{message}</p>
        </div>
	    )
    }

    return (
      <div className="baryon-body">
        <MainQuark subject={subject} langType={langType} />
        <Gluons gluons={gluons} langType={langType} />
      </div>
    )
  }
}
Baryon.propTypes = {
  quark_name: PropTypes.string.isRequired
}
export default Baryon
