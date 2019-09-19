// react
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MainQuark from './main-quark'
import Gluons from './gluons'
// utils
import QuarkUtil from './utils/quark'
import Properties from './utils/properties'
// constants
import { LANG_SUBDOMAIN_JP_LIKE } from './constants/lang-subdomain'
import { LANGTYPE_ENG_LIKE, LANGTYPE_JP_LIKE } from './constants/langtypes'

class Baryon extends Component {
  state = {
    langType: LANGTYPE_ENG_LIKE,
    isNoData: false,  // NOTE: Default has to be false, so user will see Loading..., when loading.
    quark_name: null,
    subject: null,
    targetProperties: []
  }

  componentDidMount() {
    const { quark_name, connection } = this.props

    const domainString = document.domain
    const domainFirstPart = domainString.split('.')[0]
    let langType = this.state.langType
    if (domainFirstPart === LANG_SUBDOMAIN_JP_LIKE) {
      langType = LANGTYPE_JP_LIKE
      this.setState({langType})
    }

    const neo4j = require('neo4j-driver').v1
    this.driver = neo4j.driver(connection.uri, neo4j.auth.basic(connection.user, connection.password))
    this.readGraph(quark_name, langType)
  }

  componentWillUnmount() {
    // on application exit:
    if (this.driver) {
      this.driver.close()
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.quark_name !== this.props.quark_name) {
      this.readGraph(this.props.quark_name, this.state.langType)
    }
  }

  readGraph(name, langType) {
    let name_field = 'en_name'
    if (langType === LANGTYPE_JP_LIKE) {
      name_field = 'name'
    }
    const session = this.driver.session()
    const resultPromise = session.run(
      `MATCH (subject {${name_field}: $name})-[gluon]-(object) RETURN subject, gluon, object ORDER BY (CASE gluon.start WHEN null THEN {} ELSE gluon.start END) DESC, (CASE object.start WHEN null THEN {} ELSE object.start END) DESC`,
      {name}
    )
    resultPromise.then(result => {
      session.close()

      let gluons = result.records
      const singleRecord = gluons[0]

      let subjectRaw = null
      let isNoData = true

      if (singleRecord) {
        subjectRaw = singleRecord.get(0)
        isNoData = false
      } else {
        gluons = []
      }
	    const subject = new QuarkUtil(subjectRaw, langType)
      const targetProperties = new Properties(gluons, langType)
      this.setState({subject, targetProperties, isNoData})
    })
  }

  render () {
    const { subject, targetProperties, isNoData } = this.state
    const { quark_name } = this.props

    if (!subject || (targetProperties.length === 0)) {
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
        <MainQuark subject={subject} />
        <Gluons targetProperties={targetProperties.data} />
      </div>
    )
  }
}
Baryon.propTypes = {
  quark_name: PropTypes.string.isRequired,
  connection: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
}
export default Baryon
